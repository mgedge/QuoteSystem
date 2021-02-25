const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysql = require('mysql');
const User = require('../models/user');
const sequelize = require('sequelize');

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


//When the user posts register button, save schema to the database
//TODO: Modify save to only save unique usernames (create?)
//TODO: Implement some feature to notify the user if account exists
router.post('/register', (req, res) => {
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
    let userData = req.body;

    User.findOne({ where: { userName: userData.userName } }).then((user) => {
        if (!user) {
            res.status(401).send('Invalid username!');
        }
        else {
            if(user.userPassword != userData.userPassword) {
                res.status(401).send('Invalid password!');
            }
            else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
        
    });
});

module.exports = router