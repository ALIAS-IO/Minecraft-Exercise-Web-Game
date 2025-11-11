// ##############################################################
//  MODULES
// ##############################################################

const model = require('../models/shopModel');

// ##############################################################
//  CREATE USER MODIFIERS RECORDS
// ##############################################################

module.exports.createUserModifiersRecord = (req, res, next) => {

    const data = {
        
        user_id: res.locals.user_id

    };

    next();

    model.createModifiersRecord(data);

}

// ##############################################################
//  SHOW ALL UPGRADES
// ##############################################################

module.exports.showAllPurchasableUpgrades = (req, res, next) => {

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).send("Internal Server Error")
        } else {
            return res.status(201).json(results)
        }
    }

    model.getUpgrades(callback);

}

// ##############################################################
//  SHOW ALL BOOSTERS
// ##############################################################

module.exports.showAllPurchasableBoosters = (req, res, next) => {

    const callback = (error, results, fields) => {
        
        if (error) {
            return res.status(500).send("Internal Server Error")
        } else {
            return res.status(201).json(results)
        }
    }

    model.getBoosters(callback);

}

// ##############################################################
//  CHECK IF MINION HAS ALREADY BEEN CREATED
// ##############################################################

module.exports.showAllMinions = (req, res, next) => {

    const callback = (error, results, fields) => {
    
        if (error) {

           return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results);

        }

    }

    model.getMinions(callback);

}

// ##############################################################
// CHECK CURRENT MODIFIERS
// ##############################################################

module.exports.checkCurrentModifiers = (req, res, next) => {

    const data = {
        user_id: req.body.user_id                 
    };

    const callback = (error, results, fields) => {

            if (error) {

                return res.status(500).send("Internal server error");

            } else {

                next();

            }

        };
    
        model.checkModifiers(data, callback);

};

// ##############################################################
//  CHECK FOR ACTIVE BOOSTER
// ##############################################################

module.exports.checkActiveBooster = (req, res, next) => {

    if (res.locals.user_id == undefined || req.body.booster_id == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        booster_id: req.body.booster_id,
        user_id: res.locals.user_id
    };


    const callback = (error, results, fields) => {
        console.log(error)
        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.length == 0) {

            return res.status(403).send("A booster is already active")

        } else {

            next();

        }
    };

    model.checkActiveBooster(data, callback);

}



// ##############################################################
//  CHECK FOR TOTAL SKILLPOINTS AND CURRENT UPGRADE LEVEL
// ##############################################################

module.exports.checkSkillpointsAndUpgradeLevelForBooster = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        booster_id: req.body.booster_id                 
    };

    const callback = (error, results, fields) => {
        
            if (error) {

                return res.status(500).send("Internal server error");

            } else if (results.length == 0) {
 
                return res.status(403).json({message:"Insufficient skillpoints"})

            } else {

                next();

            }

        };
    
        model.checkPointsAndLevelForBooster(data, callback);

};

// ##############################################################
//  DEDUCT SKILLPOINTS FOR BOOSTER
// ##############################################################

module.exports.deductSkillpointsForBooster = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        booster_id: req.body.booster_id                 
    };


    const callback = (error, results, fields) => {
        
        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            next();

        }
    };

    model.updateSkillpointsForBooster(data, callback);

}

// ##############################################################
//  BUY A TEMP BOOSTER
// ##############################################################

module.exports.buyTempBooster = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        booster_id: req.body.booster_id
    }

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json({message:"Temporary Booster bought successfully"});

        }
    };

    model.buyBooster(data, callback);

}

// ##############################################################
//  CHECK FOR CURRENT UPGRADE LEVEL
// ##############################################################

module.exports.checkUpgradeLevel = (req, res, next) => {

    
    if (res.locals.user_id == undefined || req.body.upgrade_level == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        user_id: res.locals.user_id,
        upgrade_level: req.body.upgrade_level             
    };


    const callback = (error, results, fields) => {
        
        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.length == 0) {

            return res.status(403).send("Upgrade already purchased, is not purchasable, or previous upgrades have not been purchased")

        } else {

            next();

        }

    };

    model.checkUpgradeLevel(data, callback);
}


// ##############################################################
//  CHECK FOR TOTAL SKILLPOINTS AND CURRENT UPGRADE LEVEL
// ##############################################################

module.exports.checkSkillpointsForUpgrade = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        upgrade_level: req.body.upgrade_level                
    };

    const callback = (error, results, fields) => {

            if (error) {

                return res.status(500).send("Internal server error");

            } else if (results.length == 0) {
 
                return res.status(403).json({message:"Insufficient skillpoints"})

            } else {

                next();

            }

        };
    
        model.checkPointsForUpgrade(data, callback);

};

// ##############################################################
//  DEDUCT SKILLPOINTS FOR UPGRADE
// ##############################################################

module.exports.deductSkillpointsForUpgrade = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        upgrade_level: req.body.upgrade_level  
    };


    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            next();

        }
    };

    model.updateSkillpointsForUpgrade(data, callback);

}

// ##############################################################
//  BUY A PERMA UPGRADE
// ##############################################################

module.exports.buyPermaUpgrade = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        upgrade_level: req.body.upgrade_level
    }

    const callback = (error, results, fields) => {
        
        if (error) {

            return res.status(500).send("Internal server error");

        } else {

           return  res.status(200).json({message:"Upgrade Level bought successfully"});

        }
    };

    model.buyUpgrade(data, callback);

}

// ##############################################################
//  CHECK FOR ALL MINIONS BOUGHT
// ##############################################################

module.exports.checkAllMinions = (req, res, next) => {

    
    if (res.locals.user_id == undefined || req.body.minion_id == undefined) {

        return res.status(400).send("Missing required data");

    }

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id    
    };


    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            next();

        }

    };

    model.checkMinions(data, callback);
}

// ##############################################################
//  CHECK FOR TOTAL SKILLPOINTS AND CURRENT UPGRADE LEVEL
// ##############################################################

module.exports.checkSkillpointsAndUpgradeLevelForMinion = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id                 
    };

    const callback = (error, results, fields) => {

            if (error) {

                return res.status(500).send("Internal server error");

            } else if (results.length == 0) {
 
                return res.status(403).json({message: "Insufficient skillpoints"})

            } else {

                next();

            }

        };
    
        model.checkPointsAndLevelForMinion(data, callback);

};

// ##############################################################
//  DEDUCT SKILLPOINTS FOR MIINION
// ##############################################################

module.exports.deductSkillpointsForMinion = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id                 
    };


    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            next();

        }
    };

    model.updateSkillpointsForMinion(data, callback);

}

// ##############################################################
//  BUY A MINION
// ##############################################################

module.exports.buyMinion = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id
    }

    const callback = (error, results, fields) => {
        
        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            res.status(200).json({message: "Minion bought successfully"});
            next();
        }
    };

    model.buyMinion(data, callback);

}