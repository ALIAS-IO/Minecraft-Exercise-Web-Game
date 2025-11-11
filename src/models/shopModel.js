// ##############################################################
//  MODULES
// ##############################################################

const pool = require('../services/db');



// ##############################################################
// CREATE USER MODIFIERS RECORD
// ##############################################################

module.exports.createModifiersRecord = (data) => {

    const SQLSTATEMENT = `

    INSERT INTO usermodifiers (user_id)
    VALUES (?)

    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES);

}

// ##############################################################
// GET ALL UPGRADES
// ##############################################################

module.exports.getUpgrades = (callback) => {

    const SQLSTATEMENT = `

    SELECT pu.description, pu.price, pu.upgrade_level FROM permaupgradeshop pu
    INNER JOIN usermodifiers um
    WHERE purchasable = true
    AND pu.level_requirement = um.current_upgrade_level

    `;

    pool.query(SQLSTATEMENT, callback);

}

// ##############################################################
// GET ALL BOOSTERS
// ##############################################################

module.exports.getBoosters = (callback) => {

    const SQLSTATEMENT = `

    SELECT tb.description, tb.price, tb.booster_id, tb.duration FROM tempboostershop tb
    INNER JOIN usermodifiers um
    WHERE tb.purchasable = true
    AND tb.level_requirement <= um.current_upgrade_level
    AND um.current_active_booster = 0

    `;

    pool.query(SQLSTATEMENT, callback);

}

// ##############################################################
// GET ALL UPGRADES
// ##############################################################

module.exports.getMinions = (callback) => {

    const SQLSTATEMENT = `

    SELECT ms.price, ms.minion_name, ms.minion_id FROM minionshop ms
    INNER JOIN usermodifiers um
    WHERE ms.level_requirement <= um.current_upgrade_level
    AND um.total_minions = ms.minion_id - 1

    `;

    pool.query(SQLSTATEMENT, callback);

}

// ##############################################################
// CHECK FOR ACTIVE BOOSTER AND CURRENT UPGRADE LEVEL
// ##############################################################

module.exports.checkModifiers = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT current_upgrade_level, current_active_booster FROM usermodifiers
    WHERE user_id = ?

    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK IF BOOSTER IS CURRENTLY ACTIVE
// ##############################################################

module.exports.checkActiveBooster = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM usermodifiers
    WHERE user_id = ?
    AND current_active_booster = 0

    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}


// ##############################################################
// CHECK FOR TOTAL SKILLPOINTS AND UPGRADE LEVEL
// ##############################################################

module.exports.checkPointsAndLevelForBooster = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM usermodifiers um
    JOIN user ON um.user_id = user.user_id
    JOIN tempboostershop tb
    WHERE um.user_id = ?
    AND tb.booster_id = ?
    AND user.skillpoints >= tb.price
    AND um.current_upgrade_level >= tb.level_requirement
    AND tb.purchasable = true

    `;

    const VALUES = [data.user_id, data.booster_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// DEDUCT SKILLPOINTS FOR TEMP BOOSTER
// ##############################################################

module.exports.updateSkillpointsForBooster = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE user
    JOIN tempboostershop tb
    SET user.skillpoints = user.skillpoints - tb.price
    WHERE user.user_id = ?
    AND tb.booster_id = ?

    `;

    const VALUES = [data.user_id, data.booster_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// BUY TEMP BOOSTER
// ##############################################################

module.exports.buyBooster = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE usermodifiers um
    JOIN tempboostershop tb
    SET um.current_active_booster = tb.booster_id, um.no_of_boosted_challenges_left = tb.duration
    WHERE um.user_id = ?
    AND tb.booster_id = ?

    `;

    const VALUES = [data.user_id, data.booster_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK IF UPGRADE ALREADY BOUGHT
// ##############################################################

module.exports.checkUpgradeLevel = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM permaupgradeshop pu
    JOIN usermodifiers um
    WHERE pu.upgrade_level = ?
    AND um.user_id = ?
    AND um.current_upgrade_level = pu.level_requirement
    AND pu.purchasable = true

    `;

    const VALUES = [data.upgrade_level, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK SKILLPOINTS AND UPGRADE LEVEL FOR UPGRADES
// ##############################################################

module.exports.checkPointsForUpgrade = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM usermodifiers um
    JOIN user ON um.user_id = user.user_id
    JOIN permaupgradeshop pu
    WHERE um.user_id = ?
    AND pu.upgrade_level = ?
    AND user.skillpoints >= pu.price

    `;

    const VALUES = [data.user_id, data.upgrade_level];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// DEDUCT SKILLPOINTS FOR PERMA UPGRADE
// ##############################################################

module.exports.updateSkillpointsForUpgrade = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE user
    JOIN permaupgradeshop pu
    SET user.skillpoints = user.skillpoints - pu.price
    WHERE user.user_id = ?
    AND pu.upgrade_level = ?

    `;

    const VALUES = [data.user_id, data.upgrade_level];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// BUY PERMA UPGRADE
// ##############################################################

module.exports.buyUpgrade = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE usermodifiers um
    JOIN permaupgradeshop pu
    SET um.current_upgrade_level = pu.upgrade_level, pu.purchasable = false
    WHERE um.user_id = ?
    AND pu.upgrade_level = ?

    `;

    const VALUES = [data.user_id, data.upgrade_level];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK IF MINION ALREADY BOUGHT
// ##############################################################

module.exports.checkMinions = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM usermodifiers
    WHERE user_id = ?
    AND total_minions = ? - 1

    `;

    const VALUES = [data.user_id, data.minion_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK SKILLPOINTS AND UPGRADE LEVEL FOR MINIONS
// ##############################################################

module.exports.checkPointsAndLevelForMinion = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM usermodifiers um
    JOIN user ON um.user_id = user.user_id
    JOIN minionshop m
    WHERE um.user_id = ?
    AND m.minion_id = ?
    AND user.skillpoints >= m.price
    AND um.current_upgrade_level >= m.level_requirement

    `;

    const VALUES = [data.user_id, data.minion_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// DEDUCT SKILLPOINTS FOR MINION
// ##############################################################

module.exports.updateSkillpointsForMinion = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE user
    JOIN minionshop m
    SET user.skillpoints = user.skillpoints - m.price
    WHERE m.minion_id = ?
    AND user.user_id = ?
    `;

    const VALUES = [data.minion_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}


// ##############################################################
// BUY MINION
// ##############################################################

module.exports.buyMinion = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE usermodifiers um
    JOIN minionshop m
    SET um.total_minions = minion_id
    WHERE m.minion_id = ?
    AND um.user_id = ?

    `;

    const VALUES = [data.minion_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}