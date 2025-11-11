// ##############################################################
//  MODULES
// ##############################################################

const pool = require('../services/db');

// ##############################################################
//  GET ALL CHALLENGES DONE BY USER
// ##############################################################

module.exports.getChallengesByUserId = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT 
    fc.challenge_id, 
    fc.challenge, 
    MAX(uc.completed) AS completed,
    MIN(uc.creation_date) AS creation_date
    FROM fitnesschallenge fc
    INNER JOIN usercompletion uc ON fc.challenge_id = uc.challenge_id
    WHERE uc.user_id = ?
    AND NOT EXISTS (
    SELECT 1 
    FROM reviews r 
    WHERE r.user_id = uc.user_id 
    AND r.challenge_id = uc.challenge_id
    )
    GROUP BY fc.challenge_id, fc.challenge;


    `;

    const VALUES = [data.user_id];


    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ##############################################################
//  GET ALL CHALLENGES DONE BY USER
// ##############################################################

module.exports.getReviewsByUserId = (data, callback) => {

    const SQLSTATEMENT = `

    SELECT 
    r.challenge_id, 
    r.challenge,
    r.review_id,
    uc.completed,
    uc.creation_date, 
    r.creation_date AS review_creation_date,
    r.last_edited_date
    FROM reviews r
    INNER JOIN (
        SELECT challenge_id, completed, creation_date
        FROM usercompletion
        WHERE user_id = ?
        AND creation_date = (
            SELECT MAX(creation_date) 
            FROM usercompletion uc2
            WHERE uc2.challenge_id = usercompletion.challenge_id 
            AND uc2.user_id = usercompletion.user_id
        )
    ) uc ON r.challenge_id = uc.challenge_id;


    `;

    const VALUES = [data.user_id];


    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ##############################################################
//  SUBMIT RATING
// ##############################################################

module.exports.insertReview = (data, callback) => {

    const SQLSTATEMENT = `

    INSERT INTO reviews (challenge_id, challenge, user_id, review, rating)
    SELECT ?, ?, ?, ?, ?

    `;

    const VALUES = [data.challenge_id, data.challenge, data.user_id, data.review, data.rating];

    pool.query(SQLSTATEMENT, VALUES, callback);
    
}

// ##############################################################
//  GET ALL CHALLENGES DONE BY USER
// ##############################################################

module.exports.getReviews = (callback) => {

    const SQLSTATEMENT = `

    SELECT 
    r.challenge_id,
    r.review_id,
    r.review,
    r.rating, 
    r.last_edited_date,
    u.username
    FROM reviews r
    INNER JOIN user u ON r.user_id = u.user_id


    `;


    pool.query(SQLSTATEMENT, callback);
}

// ##############################################################
//  DELETE REVIEW DONE BY USER
// ##############################################################

module.exports.deleteReviews = (data, callback) => {

    const SQLSTATEMENT = `

    DELETE FROM reviews
    WHERE user_id = ?
    AND review_id = ?

    `;

    const VALUES = [data.user_id, data.review_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

