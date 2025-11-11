// ##############################################################
//  MODULES
// ##############################################################

const express = require('express');
const router = express.Router();

// ##############################################################
//  ROUTERS
// ##############################################################

const reviewController = require('../controllers/reviewController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
//  ROUTES
// ##############################################################

router.get("/", jwtMiddleware.verifyToken, reviewController.getAllChallengesDoneByUser);
router.get("/completed", jwtMiddleware.verifyToken, reviewController.getAllReviewsDoneByUser);
router.post("/submit", jwtMiddleware.verifyToken, reviewController.sumbitChallengeReview);
router.get("/public", reviewController.getAllReviews);
router.delete("/", jwtMiddleware.verifyToken, reviewController.deleteReviews);

// ##############################################################
//  EXPORT ROUTER
// ##############################################################

module.exports = router;