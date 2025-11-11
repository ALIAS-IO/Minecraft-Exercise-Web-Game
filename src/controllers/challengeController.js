// ##############################################################
//  MODULES
// ##############################################################

const model = require('../models/challengeModel');

// ##############################################################
//  CREATE NEW CHALLENGE
// ##############################################################

module.exports.createNewChallenge = (req, res, next) => {

    if (req.body.challenge == undefined || res.locals.user_id == undefined || req.body.skillpoints == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        challenge: req.body.challenge,
        creator_id: res.locals.user_id,
        skillpoints: req.body.skillpoints
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(201).send({
                challenge_id: results.insertId,
                challenge: data.challenge,
                creator_id: data.creator_id,
                skillpoints: data.skillpoints
            });

        }

    };

    model.createChallenge(data, callback);

}

// ##############################################################
//  GET ALL CHALLENGES
// ##############################################################

module.exports.getAllChallenges = (req, res, next) => {

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).send(results);

        }
    };

    model.getChallenges(callback);

}

// ##############################################################
//  GET ALL USER CHALLENGES
// ##############################################################

module.exports.getAllUserChallenges = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results);

        }
    };

    model.getUserChallenges(data, callback);

}

// ##############################################################
//  CHECK FOR CHALLENGE ID AND CREATOR ID MATCH
// ##############################################################

module.exports.checkChallengeCreatorId = (req, res, next) => {

    if (req.body.user_id == undefined || req.params.challenge_id == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        challenge_id: req.params.challenge_id,
        creator_id: req.body.user_id
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.length == 0) {

            return res.status(404).send("Challenge not found");

        } else if (results[0].creator_id != data.creator_id) {

            return res.status(403).send("creator_id is different from user_id");

        } else {

            next();

        }

    };

    model.checkIdMatch(data, callback);

}

// ##############################################################
//  UPDATE CHALLENGE BY CHALLENGE ID
// ##############################################################

module.exports.updateChallengeByChallengeId = (req, res, next) => {

    if (req.body.challenge == undefined || req.body.skillpoints == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        challenge_id: +req.params.challenge_id,
        challenge: req.body.challenge,
        creator_id: req.body.user_id,
        skillpoints: req.body.skillpoints
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).send(data);

        }

    };

    model.updateChallenge(data, callback);

}

// ##############################################################
//  DELETE CHALLENGE BY CHALLENGE ID
// ##############################################################

module.exports.deleteChallengeByChallengeId = (req, res, next) => {

    if (req.params.challenge_id == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        challenge_id: req.params.challenge_id
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.affectedRows == 0) {

            return res.status(404).send("Challenge not found");

        } else {

            next();

        }

    };

    model.deleteChallenge(data, callback);

}

// ##############################################################
//  DELETE COMPLETION RECORD BY CHALLENGE ID
// ##############################################################

module.exports.deleteCompletionRecordByChallengeId = (req, res, next) => {

    if (req.params.challenge_id == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        challenge_id: req.params.challenge_id
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(204).send();

        }

    };

    model.deleteRecord(data, callback);

}

// ##############################################################
//  CREATE COMPLETION RECORD
// ##############################################################

module.exports.createCompletionRecord = (req, res, next) => {

    const data = {
        challenge_id: req.body.challenge_id,
        user_id: res.locals.user_id,
        completed: req.body.completed,
        notes: req.body.notes
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.affectedRows == 0) {

            return res.status(404).send("User or Challenge not found");

        } else {

            res.status(201).json({
                complete_id: results.insertId,
                challenge_id: req.body.challenge_id,
                user_id: res.locals.user_id,
                completed: req.body.completed,
                notes: req.body.notes
            });
            next();

        }
    };

    model.createRecord(data, callback);

}

// ##############################################################
//  CREATE COMPLETION RECORD
// ##############################################################

module.exports.updateCompletionNotes = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        complete_id: +req.params.complete_id,
        notes: req.body.notes
    };

    const callback = (error, results, fields) => {
        console.log(results)
        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.affectedRows == 0) {

            return res.status(404).send("User or Challenge not found");

        } else {

            res.status(201).json({message: "Notes Updated Successfully"});

        }
    };

    model.updateRecordNotes(data, callback);

}

// ##############################################################
//  AWARD SKILLPOINTS BASED ON COMPLETION
// ##############################################################

module.exports.awardSkillpoints = (req, res, next) => {

    const data = {
        challenge_id: req.body.challenge_id,
        user_id: res.locals.user_id
    };

    next();

    model.checkCompletion(data);

}

// ##############################################################
//  GET ALL CHALLENGE ATTEMPTS BY USER ID
// ##############################################################

module.exports.getChallengeAttemptsByUserId = (req, res, next) => {

    if (res.locals.user_id == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        user_id: res.locals.user_id
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.length == 0) {

            return  res.status(404).send("No attempts found");

        } else {

            return res.status(200).send(results);

        }

    };

    model.getRecords(data, callback);

}
