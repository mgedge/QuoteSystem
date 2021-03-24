/**************************************************/
/*              API CONFIGURATION                 */
/**************************************************/
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const router = express.Router();

//Hidden keys
require('dotenv/config')

const User = require('../models/users');

/**************************************************/
/*               END OF CONFIGURATION             */
/**************************************************/


//Sample get call
router.get('/', (req, res) => {
    res.send('From API')
});

//Verify Authentication
function verifyToken(req, res, next) {
    //Check auth in header
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];

    //Check token
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, process.env.SECRET_KEY);

    //Invalid token
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }

    req.userID = playload.subject;
    next();
}

//POST : Registration
router.post('/register', (req, res) => {
    //Hash the password
    bcrypt.hash(req.body.password, 10).then((hash) => {
        //Create the user using the hashed password
        const user = new User({
            username: req.body.username,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            image: req.body.image,
            roles: req.body.roles
        });

        //Save the user to the database
        user.save().then((response) => {
            res.status(201).json({
                message: "Registration successful",
                new_user: response
            });

            console.log(response);
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }).catch(err => {
        res.status(500).json({
            message: "Failed to hash password",
            error: err
        })
    })
});

//POST : Login authentication
router.post('/login', (req, res) => {

    let thisUser;

    //Find the user in the database
    User.find({ username: req.body.username }).exec().then(userFound => {
        thisUser = userFound[0];

        //Next compare the hashed passwords
        return bcrypt.compare(req.body.password, userFound[0].password)
    }).then(pass => {
        //If they're the same, send token
        if (pass) {
            //Create a token for the logged in user
            let token = jwt.sign({
                username: thisUser.username,
                userID: thisUser._id
            }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });

            //Hide password from the return
            thisUser.password = '';

            //User login checks out
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                user: thisUser
            })
        }
        else {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
    }).catch(err => {
        res.status(404).json({
            message: "Invalid username",
            search: req.body.username,
        });
    })
});

router.get('/#', verifyToken, (req, res) => {
    res.sendStatus(200);
})

// GET the logged in user's id and username from the token
router.get('/user', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];

    let decode = jwt.verify(token, process.env.SECRET_KEY,);
    console.log(decode)

    let userID = decode.userID;

    console.log(userID)

    res.status(200).json({
        userID: userID
    })
})

// GET All Users (employees)
router.get('/users', (req, res) => {
    User.find().exec().then(result => {
        res.status(200).json(result);
    })
        .catch(err => {
            res.status(500).json({ error: err })
        });
})

// GET the user information by their id
// TODO implement GraphQL call to trim info
router.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        //TODO REMOVE this line when GraphQL implemented
        user.password = "";

        if (user) {
            res.status(200).json({ user: user });
        }
        else {
            res.status(404).json({ message: "No user found by that id" })
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
});

//Get the user role info from the user_role table
// @returns json object of the row where passed id is requested
router.route('/user/role/:id').get((req, res) => {
    User.findOne({ where: { role_id: req.params.id } }).then((user) => {
        //console.log("The user role is: " + user.role_id)

        res.status(200).json({
            msg: user
        })

        //return user.role_id;
    });
});

module.exports = router;