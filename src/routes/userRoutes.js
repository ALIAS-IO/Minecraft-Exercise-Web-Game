// ##############################################################
//  MODULES
// ##############################################################

const express = require('express');
const router = express.Router();

// ##############################################################
//  ROUTERS
// ##############################################################

const userController = require('../controllers/userController');
const challengeController = require('../controllers/challengeController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
//  ROUTES
// ##############################################################

router.get("/", jwtMiddleware.verifyToken, userController.getUsersDetailsById);
router.put("/update", jwtMiddleware.verifyToken, userController.checkDuplicateUsername, userController.updateUserByUserId);
router.get("/completions", jwtMiddleware.verifyToken, challengeController.getChallengeAttemptsByUserId);
router.post("/completions", jwtMiddleware.verifyToken, challengeController.createCompletionRecord ,challengeController.awardSkillpoints);
router.put("/completions/:complete_id", jwtMiddleware.verifyToken, challengeController.updateCompletionNotes);


// ##############################################################
//  EXPORT ROUTER
// ##############################################################

module.exports = router;