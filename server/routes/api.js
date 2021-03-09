//const environment = require('./../../src/environments/environment')

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysql = require('mysql');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const authorize = require('../middleware/auth');

const UserRole = require('../models/user_role')
const user_role = require('../models/user_role');

//Create a connection to the local mysql server
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'Matt',
    password : 'Matt',
    database : 'quote'
});

//Connect to the local db server
connection.connect(function(err) {
    if(err) {
        console.log(err)
    }
    else {
        console.log("Connected");
    }

    // connection.query("SELECT * FROM users", function(err, result, fields) {
    //     if(err) console.log(err)

    //     console.log(result);
    // });
});

//Get the admin ui
router.get('/admin', (req, res) => {
    res.send('From API');
})

//When the user posts register button, save schema to the database
//TODO: Modify save to only save unique usernames (create?)
//TODO: Implement some feature to notify the user if account exists
router.post('/register', (req, res, next) => {
    //Hash the password
    bcrypt.hash(req.body.userPassword, 10).then((hash) => {
        //Add the user to db using the hashed password
        const user = new User({
            userName: req.body.userName,
            userPassword: hash
        });

        user.save().then((response) => {
            res.status(201).json({
                message: "Registration successful",
                result: response
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });


    /*
    let userData = req.body;
    let user = new User(userData);
    
    user.save((err, registeredUser) => {
        if(err) {
            console.log("ERROR: " + err);
        }
        else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
    });

    /*

    const userAccount = User.findOne({userName: userData.userName}, (err, user));
    if(userAccount == null) {
        //res.status(401).send('Invalid username!');
    }
    else {
        user.save((err, registeredUser) => {
            if(err) {
                console.log("ERROR: " + err);
            }
            else {
                res.status(200).send(registeredUser);
            }
        });
    }

    /*
    User.findOne({userName: userData.username}, (err, user) => {
        if(err) {
            console.log(err)
        }
        else {
            if(!user) {
                res.status(401).send('Invalid username');
            }
            else {
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                }
                else {
                    res.status(200).send(user);
                }
            }
        }
    });
    */

});

//When user posts login button, verify credentials
router.post('/login', (req, res) => {

    let thisUser;

    User.findOne({ where: { userName: req.body.userName } })
    .then((user) => {
        //Verify the username
        if(!user) {
            return res.status(401).json({
                message: "Authentication failed: invalid username"
            })
        }

        //Set the 'function' user variable to the user found
        thisUser = user;

        //Next compare the hashed passwords
        return bcrypt.compare(req.body.userPassword, user.userPassword);
    })
    .then((resp) => {
        //Verify the password
        if(!resp) {
            return res.status(401).json({
                message: "Authentication failed: invalid password"
            })
        }

        //Create a token for the logged in user
        let token = jwt.sign({
            userName: thisUser.userName,
            userID: thisUser.userID
        }, 'secretKey', {       //TODO implement hidden key found in environment.ts
            expiresIn: "1h"
        });

        //User login checks out
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            msg: thisUser
        })

    }).catch((err) => {
        return res.status(401).json({
            message: "Something went wrong with authentication"
        })
    })


    /*
    let userData = req.body;
    let role;

    console.log('Enter login')

    User.findOne({ where: { userName: userData.userName } }).then((user) => {
        console.log('Enter find')
        if (!user) {
            console.log('Invalid username');
            res.status(401).send('Invalid username!');
        }
        else {
            if(user.userPassword != userData.userPassword) {
                console.log('Invalid password');
                res.status(401).send('Invalid password!');
            }
            else {
                console.log('Access granted');
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey');

                res.status(200).send({token})

                //Replace this with GraphQL to remove the query statemnt
                // connection.query("SELECT `role_id` FROM `user_roles` WHERE `user_id`=" + user.userID, function(err, result, fields) {
                //     if(err) console.log(err)
                    
                //     //Query returns a json object
                //     var json = JSON.parse(JSON.stringify(result));

                //     //Save the role to storage
                //     localStorage.setItem('role', json)
                //     console.log(json[0].role_id)
                // });

                // UserRole.findAll({ where: {role_id: user.userID} }).then((roles) => {
                //     role = roles.role_id

                //     console.log('Role: ' + role)

                //     //!!localStorage.setItem('role', role)
                //     res.send({role})
                // });

            }
        }
    });

    */
});

//Get the admin ui
router.get('/admin', (req, res) => {
    res.send('From API');
})

//Get the sales ui
router.get('/sales', (req, res) => {
    res.send('From API');
})

//Get the supervisor ui
router.get('/super', (req, res) => {
    res.send('From API');
})

// Get Users
router.route('/').get((req, res) => {
    User.find((error, response) => {
        if (error) {
            return next(error)
        } 
        else {
            res.status(200).json(response)
        }
    })
})

//Get the user info from the user_role table
// @returns json object of the row where passed id is requested
router.route('/user/:id').get((req, res, next) => {
    UserRole.findOne({ where: { user_id: req.params.id} }).then((user) => {
        console.log("The user role is: " + user.role_id)

        res.status(200).json({
            msg: user
        })

        //return user.role_id;
    });



    // UserRole.findOne({ where: { user_id: req.params.id} }, (err, data) => {
    //     if(err) {
    //         console.log("'/user/id' failed to find the requested user")
    //         return next(err);
    //     }
    //     else {
    //         console.log("Item foudn")

    //         res.status(200).json({
    //             msg: data
    //         })
    //     }
    // });
})

// router.route('/user/:id/role').get((req, res, next) => {
//     User
// })



module.exports = router;