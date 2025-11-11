// ##############################################################
//  MODULES
// ##############################################################

const model = require('../models/userModel');

// ##############################################################
//  CHECK FOR DUPLICATE USERNAME
// ##############################################################

module.exports.checkDuplicateUsername = (req, res, next) => {

    const data = {
        username: req.body.username,
        email: req.body.email
    };

    const callback = (error, results, fields) => {
            if (error) {

                return res.status(500).send("Internal server error");

            }
            else if (results.length > 0) {

                return res.status(409).json({message:"Username or Email already taken"});

            } else {

                next();

            }

        };
    
        model.checkDuplicate(data, callback);

};

// ##############################################################
//  GET ALL DETAILS OF USERS
// ##############################################################

module.exports.getUsersDetailsById = (req, res, next) => {

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

    model.getUserDetails(data, callback);

};

// ##############################################################
//  UPDATE USER DETAILS BY USER ID
// ##############################################################

module.exports.updateUserByUserId = (req, res, next) => {

    const data = {
        user_id: res.locals.user_id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    const callback = (error, results, fields) => {

        if (error) {

            return res.status(500).send("Internal server error");

        } else if (results.changedRows == 0) {

            return res.status(404).send("User not found");

        } else {

            return res.status(200).send(data);

        }

    };

    model.updateUser(data,callback);

};

//////////////////////////////////////////////////////
// GET ALL PLAYERS BY USER
//////////////////////////////////////////////////////

module.exports.getAllPlayersByUser = (req, res, next) => {
    if (req.params.userId == undefined) {
        console.error("Error getAllPlayersByUser:");
        res.status(400).send("Error: userId is undefined");
        return;
    }

    const data = {
        userId: req.params.id
    }

    const callback = (error, results, fields) => {
        
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(results);
        }
    }

    model.selectAllPlayersByUser(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////

module.exports.loginUser = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        console.error("Error getAllPlayersByUser:");
        res.status(400).send("Error: Missing Data Required");
        return;
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if(error) {
            return res.status(500).send("Internal Server Error")
        } else if (results.length == 0) {
            return res.status(404).json({
                message: "User not found"
            })
        } else {
            res.locals.user_id = results[0].user_id
            res.locals.hash = results[0].password
            next();
        }
    }

    model.selectUserByUsername(data, callback)
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////

module.exports.registerNewUser = (req, res, next) => {

    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
        console.error("Error getAllPlayersByUser:");
        res.status(400).send("Error: Missing Data Required");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if(error) {
            return res.status(500).send("Internal Server Error")
        } else {
            res.locals.message = `User ${data.username} created successfully.`
            res.locals.user_id = results.insertId
            next();
        }
    }

    model.insertNew(data, callback)
}


//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////

module.exports.checkUsernameOrEmailExist = (req, res, next) => {

    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if(error) {
            res.status(500).send("Internal Server Error")
        } else if (results.length != 0) {
            res.status(409).json({
                message: "Username or email already exists"
            })
        } else {
            next();
        }
    }

    model.selectUserByUsernameOrEmail(data, callback)
}

//////////////////////////////////////////////////////
// MIDDLWARE FOR CHECK IF PLAYER BELONGS TO USER
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////

module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback)
}