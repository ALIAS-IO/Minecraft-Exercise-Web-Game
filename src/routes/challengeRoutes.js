// ##############################################################
//  MODULES
// ##############################################################

const express = require('express');
const router = express.Router();

// ##############################################################
//  ROUTERS
// ##############################################################

const challengeController = require('../controllers/challengeController');
const shopController = require('../controllers/shopController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
//  ROUTES
// ##############################################################

router.post("/new", jwtMiddleware.verifyToken, challengeController.createNewChallenge);
router.get("/", challengeController.getAllChallenges);
router.get("/user", jwtMiddleware.verifyToken, challengeController.getAllUserChallenges);
router.put("/:challenge_id", challengeController.checkChallengeCreatorId, challengeController.updateChallengeByChallengeId);
router.delete("/:challenge_id", challengeController.deleteChallengeByChallengeId, challengeController.deleteCompletionRecordByChallengeId);

// ##############################################################
//  EXPORT ROUTER
// ##############################################################

module.exports = router;