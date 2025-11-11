// ##############################################################
//  MODULES
// ##############################################################

const pool = require('../services/db');

// ##############################################################
// SHOW ALL MINION UPGRADES
// ##############################################################

module.exports.getUserMinions = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM minions
    WHERE user_id = ?

    `;

    const VALUES = [data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// GET ALL MINION UPGRADES
// ##############################################################

module.exports.getMinions = (callback) => {

    const SQLSTATEMENT = `

    SELECT minion_id, minion_name FROM minions

    `;

    pool.query(SQLSTATEMENT, callback);

}

// ##############################################################
// GET ALL MINION UPGRADES
// ##############################################################

module.exports.getMinionUpgrades = (callback) => {

    const SQLSTATEMENT = `

    SELECT mu.description, mu.level_requirement, mu.price, mu.upgrade_level, m.minion_id, m.minion_name FROM minionupgradeshop mu
    INNER JOIN minions m ON mu.level_requirement = m.minion_level
    WHERE mu.purchasable = true

    `;

    pool.query(SQLSTATEMENT, callback);

}

// ##############################################################
// GET ALL MINION UPGRADES
// ##############################################################

module.exports.getMinionBoosters = (callback) => {

    const SQLSTATEMENT = `

    SELECT mb.description, mb.level_requirement, mb.price, mb.booster_id, mb.duration, m.minion_id, m.minion_name FROM minionboostershop mb
    INNER JOIN minions m ON mb.level_requirement <= m.minion_level
    WHERE mb.purchasable = true

    `;

    pool.query(SQLSTATEMENT, callback);

}

// ##############################################################
// CREATE MINION
// ##############################################################

module.exports.createMinion = (data, callback) => {

    const SQLSTATEMENT = `

    INSERT INTO minions (minion_id, user_id, minion_name)
    SELECT ms.minion_id, um.user_id, IF(ms.minion_name IS NULL, ms.minion_name, ?)
    FROM usermodifiers um
    JOIN minionshop ms
    WHERE um.user_id = ?
    AND ms.minion_id = ?
    

    `;

    const VALUES = [data.minion_name, data.user_id, data.minion_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// GIVE MINION TITLE
// ##############################################################

module.exports.giveTitle = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE minions m
    JOIN minionshop ms ON ms.minion_id = m.minion_id
    JOIN minionrank mr 
    SET m.title = CONCAT(mr.rank_title, " ", ms.title)
    WHERE m.user_id = ?
    AND mr.total_resources_needed <= m.resources_collected

    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK IF UPGRADE ALREADY BOUGHT
// ##############################################################

module.exports.checkUpgradeLevel = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM minionupgradeshop mu
    JOIN minions m
    WHERE mu.upgrade_level = ?
    AND m.user_id = ?
    AND m.minion_id = ?
    AND m.current_upgrade_level = mu.level_requirement
    AND mu.purchasable = true

    `;

    const VALUES = [data.upgrade_level, data.user_id, data.minion_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK SKILLPOINTS AND UPGRADE LEVEL FOR UPGRADES
// ##############################################################

module.exports.checkPointsForUpgrade = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM minionupgradeshop mu
    JOIN user u
    WHERE u.user_id = ?
    AND mu.upgrade_level = ?
    AND u.skillpoints >= mu.price

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
    JOIN minionupgradeshop mu
    SET user.skillpoints = user.skillpoints - mu.price
    WHERE user.user_id = ?
    AND mu.upgrade_level = ?

    `;

    const VALUES = [data.user_id, data.upgrade_level];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// BUY PERMA UPGRADE
// ##############################################################

module.exports.buyUpgrade = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE minions m
    JOIN permaupgradeshop mu
    SET m.minion_level = mu.upgrade_level
    WHERE m.user_id = ?
    AND mu.upgrade_level = ?
    AND m.minion_id = ?

    `;

    const VALUES = [data.user_id, data.upgrade_level, data.minion_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// CHECK IF BOOSTER IS CURRENTLY ACTIVE
// ##############################################################

module.exports.checkActiveBooster = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM minions
    WHERE current_active_booster = 0
    AND minion_id = ?

    `;

    const VALUES = [data.minion_id]

    pool.query(SQLSTATEMENT, VALUES,  callback);

}


// ##############################################################
// CHECK FOR TOTAL SKILLPOINTS AND UPGRADE LEVEL
// ##############################################################

module.exports.checkPointsForBooster = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM minionboostershop mb
    JOIN user u
    WHERE u.user_id = ?
    AND mb.booster_id = ?
    AND u.skillpoints >= mb.price
    AND mb.purchasable = true

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
    JOIN tempboostershop mb
    SET user.skillpoints = user.skillpoints - mb.price
    WHERE user.user_id = ?
    AND mb.booster_id = ?

    `;

    const VALUES = [data.user_id, data.booster_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// BUY BOOSTER
// ##############################################################

module.exports.buyBooster = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE minions m
    JOIN minionboostershop mb
    SET m.current_active_booster = mb.booster_id, m.booster_duration = mb.duration
    WHERE m.user_id = ?
    AND mb.booster_id = ?
    AND m.minion_id = ?

    `;

    const VALUES = [data.user_id, data.booster_id, data.minion_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// COLLECT RESOURCES
// ##############################################################

module.exports.collectResources = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE minions m
    JOIN minionboostershop mb ON um.current_active_booster = tb.booster_id
    JOIN minionupgradeshop mu ON um.current_upgrade_level = mu.upgrade_level
    SET m.resources_collected = m.resources_collected + (IF(mb.type = "ADD", 0.1 + (mb.stats / 3600), 0.1 * mb.stats) * mu.stats)*,
    um.no_of_boosted_challenges_left = IF(um.no_of_boosted_challenges_left > 0, um.no_of_boosted_challenges_left - 1, 0),
    um.current_active_booster = IF(um.no_of_boosted_challenges_left = 1, 0, um.current_active_booster)
    WHERE f.challenge_id = ?
    AND user.user_id = ?;

    `;

    const VALUES = [data.user_id, data.booster_id, data.minion_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}