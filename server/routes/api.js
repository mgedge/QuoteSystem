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
        console.log(err);
    }
    else {
        console.log("Connected");
    }

    // connection.query("SELECT * FROM users", function(err, result, fields) {
    //     if(err) console.log(err)

    //     console.log(result);
    // });
});

//Verify Authentication
function verifyToken(req, res, next) {
    //Check auth in header
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];

    //Check token 
    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'secretKey');

    //Invalid token
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }

    req.userID = playload.subject;
    next();
}

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
        //Create the user using the hashed password
        const user = new User({
            userName: req.body.userName,
            userPassword: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });

        //Save the user to the database
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
});

//Get the admin ui
router.get('/admin', verifyToken, (req, res) => {
    res.send('From API');
})

//Get the sales ui
router.get('/sales', verifyToken, (req, res) => {
    res.send('From API');
})

//Get the supervisor ui
router.get('/super', verifyToken, (req, res) => {
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
router.route('/user/:id').get((req, res) => {
    User.findOne({ where: { userID: req.params.id} }).then((user) => {
        //console.log("The user role is: " + user.role_id)

        res.status(200).json({
            msg: user
        })

        //return user.role_id;
    });
})

//Get the user role info from the user_role table
// @returns json object of the row where passed id is requested
router.route('/user/role/:id').get((req, res) => {
    UserRole.findOne({ where: { user_id: req.params.id} }).then((user) => {
        //console.log("The user role is: " + user.role_id)

        res.status(200).json({
            msg: user
        })

        //return user.role_id;
    });
})

module.exports = router;