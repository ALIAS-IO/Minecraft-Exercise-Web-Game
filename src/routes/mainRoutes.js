// ##############################################################
//  MODULES
// ##############################################################

const express = require('express');
const router = express.Router();

// ##############################################################
//  ROUTERS
// ##############################################################

const userRoutes = require('./userRoutes.js');
const challengeRoutes = require('./challengeRoutes.js');
const shopRoutes = require('./shopRoutes.js');
const minionRoutes = require('./minionRoutes.js');
const reviewRoutes = require('./reviewRoutes.js');
const userController = require('../controllers/userController');
const shopController = require('../controllers/shopController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');

// ##############################################################
//  ROUTES
// ##############################################################

router.use('/user', userRoutes);
router.use('/challenges', challengeRoutes);
router.use('/shop', shopRoutes);
router.use('/minions', minionRoutes);
router.use('/reviews', reviewRoutes);

router.post("/login", userController.loginUser, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.registerNewUser, shopController.createUserModifiersRecord, jwtMiddleware.generateToken, jwtMiddleware.sendToken);


// ##############################################################
//  EXPORT ROUTER
// ##############################################################

module.exports = router;
