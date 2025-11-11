// ##############################################################
//  MODULES
// ##############################################################

const express = require('express');
const router = express.Router();

// ##############################################################
//  ROUTERS
// ##############################################################

const minionController = require('../controllers/minionController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
//  ROUTES
// ##############################################################

router.get("/", jwtMiddleware.verifyToken, minionController.showAllUserMinions);
router.get("/upgrade", minionController.showAllMinionUpgrades);
router.get("/show", minionController.showAllMinions);
router.get("/booster/:minion_id", minionController.showAllMinionBoosters);
router.put("/upgrade", jwtMiddleware.verifyToken, minionController.checkSkillpointsForUpgrade, minionController.deductSkillpointsForUpgrade,  minionController.buyUpgrade);
router.put("/booster", jwtMiddleware.verifyToken, minionController.checkSkillpointsForBooster, minionController.deductSkillpointsForBooster, minionController.buyMinionBooster);


// ##############################################################
//  EXPORT ROUTER
// ##############################################################

module.exports = router;