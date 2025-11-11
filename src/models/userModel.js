// ##############################################################
//  MODULES
// ##############################################################

const pool = require('../services/db');

// ##############################################################
// CHECK FOR DUPLICATE USERNAMES
// ##############################################################

module.exports.checkDuplicate = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT * FROM user 
    WHERE username = ?
    OR email = ?

    `;

    const VALUES = [data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

// ##############################################################
// GET ALL DETAILS OF USERS
// ##############################################################

module.exports.getUserDetails = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT u.username, u.email, u.skillpoints, um.current_upgrade_level, um.current_active_booster, um.no_of_boosted_challenges_left, um.total_minions 
    FROM user u, usermodifiers um
    WHERE u.user_id = ?

    `;

    const VALUES = [data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);

}


// ##############################################################
// UPDATE USER DETAILS
// ##############################################################

module.exports.updateUser = (data, callback) => {

    const SQLSTATEMENT = `

    UPDATE user
    SET 
    username = CASE WHEN ? <> '' THEN ? ELSE username END,
    email = CASE WHEN ? <> '' THEN ? ELSE email END,
    password = CASE WHEN ? <> '' THEN ? ELSE password END
    WHERE user_id = ?;

    `;

    const VALUES = [data.username, data.username, data.email, data.email, data.password, data.password, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////

module.exports.selectUserByUsernameOrEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM user
        WHERE username = ?
        OR email = ?
    `

    const VALUES = [data.username, data.email]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

//////////////////////////////////////////////////////
// INSERT NEW USER 
//////////////////////////////////////////////////////

module.exports.insertNew = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO user (username, email, password)
        VALUES (?, ?, ?)
    `

    const VALUES = [data.username, data.email, data.password]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////

module.exports.selectUserByUsername = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM user
        WHERE username = ?
    `

    const VALUES = [data.username]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

//////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////

module.exports.selectAll = (callback) =>{
    const SQLSTATMENT = `
        SELECT * FROM user;
        `;
    
    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM user
        WHERE id = ?;
        `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}
