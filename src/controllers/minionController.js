// ##############################################################
//  MODULES
// ##############################################################

const model = require('../models/minionModel');

// ##############################################################
//  SHOW ALL USER MINIONS
// ##############################################################

module.exports.showAllUserMinions = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
    
        if (error) {

           return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results);

        }

    }

    model.getUserMinions(data, callback);

}

// ##############################################################
//  GET ALL MINIONS
// ##############################################################

module.exports.showAllMinions = (req, res, next) => {

    const callback = (error, results, fields) => {
    
        if (error) {
           return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results)

        }

    }

    model.getMinions(callback);

}

// ##############################################################
//  GET ALL MINION UPGRADES
// ##############################################################

module.exports.showAllMinionUpgrades = (req, res, next) => {

    const callback = (error, results, fields) => {
    
        if (error) {

           return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results)

        }

    }

    model.getMinionUpgrades(callback);

}

// ##############################################################
//  GET ALL MINION BOOSTERS
// ##############################################################

module.exports.showAllMinionBoosters = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
           return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json(results)

        }

    }

    model.getMinionBoosters(callback);

}


// ##############################################################
//  ACTIVATE MINION
// ##############################################################

module.exports.activateMinion = (req, res, next) => {

    const data = {
        
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id,
        minion_name: req.body.minion_name
        
    };

    const callback = (error, results, fields) => {
    
        if (error) {

           return res.status(500).send("Internal server error");

        } else {

            next();

        }

    }


    model.createMinion(data, callback);

}

// ##############################################################
//  AWARD MINION TITLE
// ##############################################################

module.exports.awardMinionTitle = (req, res, next) => {

    const data = {
        
        user_id: res.locals.user_id,
        
    };

    const callback = (error, results, fields) => {

        if (error) {

           return res.status(500).send("Internal server error");

        }
    }


    model.giveTitle(data, callback);

}


// ##############################################################
//  CHECK FOR TOTAL SKILLPOINTS AND CURRENT UPGRADE LEVEL
// ##############################################################

module.exports.checkSkillpointsForUpgrade = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id,
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

module.exports.buyUpgrade = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id,
        upgrade_level: req.body.upgrade_level
    }

    const callback = (error, results, fields) => {
        
        if (error) {
            console.log(error)
            return res.status(500).send("Internal server error");

        } else {

           return  res.status(200).json({message:"Upgrade Level bought successfully"});

        }
    };

    model.buyUpgrade(data, callback);

}

// ##############################################################
//  CHECK FOR ACTIVE BOOSTER
// ##############################################################

module.exports.checkActiveBooster = (req, res, next) => {

    const data = {
        minion_id: +req.params.minion_id
    }

    const callback = (error, results, fields) => {
        
        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.length == 0) {

            return res.status(403).json({message:"Booster currently active"});

        } else {

            next();

        }
    };

    model.checkActiveBooster(data, callback);

}



// ##############################################################
//  CHECK FOR TOTAL SKILLPOINTS AND CURRENT UPGRADE LEVEL
// ##############################################################

module.exports.checkSkillpointsForBooster = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id,
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
    
        model.checkPointsForBooster(data, callback);

};

// ##############################################################
//  DEDUCT SKILLPOINTS FOR BOOSTER
// ##############################################################

module.exports.deductSkillpointsForBooster = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id,
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

module.exports.buyMinionBooster = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id,
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
//  BUY A TEMP BOOSTER
// ##############################################################

module.exports.collectResources = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        minion_id: req.body.minion_id,
    }

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else {

            return res.status(200).json({message:"Resources collected"});

        }
    };

    model.buyBooster(data, callback);

}