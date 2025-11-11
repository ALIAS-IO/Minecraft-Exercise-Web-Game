// ##############################################################
//  MODULES
// ##############################################################

const pool = require('../services/db');

// ##############################################################
//  CREATE NEW CHALLENGE
// ##############################################################

module.exports.createChallenge = (data, callback) => {

    const SQLSTATEMENT = `

    INSERT INTO fitnesschallenge (challenge, creator_id, skillpoints)
    VALUES (?, ?, ?)

    `;

    const VALUES = [data.challenge, data.creator_id, data.skillpoints];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
//  GET ALL CHALLENGES
// ##############################################################

module.exports.getChallenges = (callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM fitnesschallenge;

    `;


    pool.query(SQLSTATEMENT, callback);
}

// ##############################################################
//  GET ALL USER CHALLENGES
// ##############################################################

module.exports.getUserChallenges = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM fitnesschallenge
    WHERE creator_id = ?

    `;

    const VALUES = [data.user_id]


    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ##############################################################
//  CHECK IF CHALLENGE ID AND CREATOR ID MATCHES
// ##############################################################

module.exports.checkIdMatch = (data, callback) => {
    const SQLSTATEMENT = `

    SELECT creator_id FROM fitnesschallenge
    WHERE challenge_id = ?

    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
//  UPDATE CHALLENGE BY CHALLENGE ID
// ##############################################################

module.exports.updateChallenge = (data, callback) => {
    const SQLSTATEMENT = `

    UPDATE fitnesschallenge
    SET challenge = ?, skillpoints = ?
    WHERE challenge_id = ?

    `;

    const VALUES = [data.challenge, data.skillpoints, data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
//  DELETE CHALLENGE BY CHALLENGE ID
// ##############################################################

module.exports.deleteChallenge = (data, callback) => {

    const SQLSTATEMENT = `

    DELETE FROM fitnesschallenge
    WHERE challenge_id = ?

    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
//  DELETE CHALLENGE RECORD BY CHALLENGE ID
// ##############################################################

module.exports.deleteRecord = (data, callback) => {

    const SQLSTATEMENT = `

    DELETE FROM fitnesschallenge
    WHERE challenge_id = ?

    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
//  CREATE NEW CHALLENGE RECORD
// ##############################################################

module.exports.createRecord = (data, callback) => {

    const SQLSTATEMENT = `

    INSERT INTO usercompletion (challenge_id, user_id, completed, notes)
    SELECT ?, ?, ?, ?

    `;

    const VALUES = [data.challenge_id, data.user_id, data.completed, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
//  CREATE NEW CHALLENGE RECORD
// ##############################################################

module.exports.updateRecordNotes = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE usercompletion
    SET notes = ?
    WHERE user_id = ?
    AND complete_id = ?

    `;

    const VALUES = [data.notes, data.user_id, data.complete_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
//  CHECK CHALLENGE COMPLETION
// ##############################################################

module.exports.checkCompletion = (data) => {

    const SQLSTATEMENT = `

    UPDATE user
    JOIN usercompletion u ON u.user_id = user.user_id
    JOIN fitnesschallenge f ON u.challenge_id = f.challenge_id
    JOIN usermodifiers um ON user.user_id = um.user_id
    JOIN tempboostershop tb ON um.current_active_booster = tb.booster_id
    JOIN permaupgradeshop pu ON um.current_upgrade_level = pu.upgrade_level
    SET user.skillpoints = user.skillpoints +
       IF(u.completed = true,
          IF(tb.type = "ADD", f.skillpoints + tb.stats, f.skillpoints * tb.stats) * pu.stats,
          5
       ),
    um.no_of_boosted_challenges_left = IF(um.no_of_boosted_challenges_left > 0, um.no_of_boosted_challenges_left - 1, 0),
    um.current_active_booster = IF(um.no_of_boosted_challenges_left = 1, 0, um.current_active_booster)
    WHERE f.challenge_id = ?
    AND user.user_id = ?;

    `;

    const VALUES = [data.challenge_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES);

}

// ##############################################################
//  GET ALL CHALLENGE RECORDS
// ##############################################################

module.exports.getRecords = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT complete_id, challenge_id, completed, creation_date, notes FROM usercompletion
    WHERE user_id = ?

    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
    
}