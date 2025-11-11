// ##############################################################
//  MODULES
// ##############################################################

const express = require('express');
const router = express.Router();

// ##############################################################
//  ROUTERS
// ##############################################################

const shopController = require('../controllers/shopController');
const minionController = require('../controllers/minionController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
//  ROUTES
// ##############################################################

router.get("/permaupgrade", shopController.showAllPurchasableUpgrades);
router.get("/tempbooster", shopController.showAllPurchasableBoosters);
router.get("/minion", shopController.showAllMinions);
router.put("/tempbooster", jwtMiddleware.verifyToken, shopController.checkSkillpointsAndUpgradeLevelForBooster, shopController.deductSkillpointsForBooster,  shopController.buyTempBooster);
router.put("/permaupgrade", jwtMiddleware.verifyToken, shopController.checkSkillpointsForUpgrade, shopController.deductSkillpointsForUpgrade,  shopController.buyPermaUpgrade);
router.put("/minion", jwtMiddleware.verifyToken, shopController.checkSkillpointsAndUpgradeLevelForMinion, shopController.deductSkillpointsForMinion,  shopController.buyMinion, minionController.activateMinion, minionController.awardMinionTitle);

// ##############################################################
//  EXPORT ROUTER
// ##############################################################

module.exports = router;