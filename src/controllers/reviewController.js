// ##############################################################
//  MODULES
// ##############################################################

const model = require('../models/reviewModel');

// ##############################################################
//  GET ALL CHALLENGES DONE BY USER
// ##############################################################

module.exports.getAllChallengesDoneByUser = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results);

        }
    };

    model.getChallengesByUserId(data, callback);

}

// ##############################################################
//  GET ALL CHALLENGES DONE BY USER
// ##############################################################

module.exports.getAllReviewsDoneByUser = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results);

        }
    };

    model.getReviewsByUserId(data, callback);

}

// ##############################################################
//  GET ALL CHALLENGES DONE BY USER
// ##############################################################

module.exports.sumbitChallengeReview = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        challenge_id: req.body.challenge_id,
        challenge: req.body.challenge,
        review: req.body.review,
        rating: req.body.rating,
    };

    const callback = (error, results, fields) => {
        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results);

        }
    };

    model.insertReview(data, callback);

}

// ##############################################################
//  GET ALL CHALLENGES DONE BY USER
// ##############################################################

module.exports.getAllReviews = (req, res, next) => {

    const callback = (error, results, fields) => {

        if (error) {
            console.log(error)
            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results);

        }
    };

    model.getReviews(callback);

}

// ##############################################################
//  DELETE CHALLENGES DONE BY USER
// ##############################################################

module.exports.deleteReviews = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        review_id: req.body.review_id
    }

    const callback = (error, results, fields) => {
        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(204).send();

        }
    };

    model.deleteReviews(data, callback);

}