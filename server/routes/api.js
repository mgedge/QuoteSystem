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
    // const user = new User({
    //     username: req.body.username,
    //     password: req.body.password,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    // });

    //Hash the password
    bcrypt.hash(req.body.password, 10).then((hash) => {
        //Create the user using the hashed password
        const user = new User({
            username: req.body.username,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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


    // User.find({ username: req.body.username }).exec()
    // .then((user) => {
    //     //Verify the username
    //     if(!user) {
    //         res.status(401).json({
    //             message: "Authentication failed: invalid username",
    //         });
    //     };

    //     //Set the 'function' user variable to the user found
    //     thisUser = user;


    //     //Next compare the hashed passwords
    //     //return bcrypt.compare(req.body.password, user.password);
    // })
    // .then((pass) => {
    //     //Verify the password
    //     if(!pass) {
    //         return res.status(401).json({
    //             message: "Authentication failed: invalid password"
    //         })
    //     }

    //     //Create a token for the logged in user
    //     let token = jwt.sign({
    //         username: thisUser.username,
    //         userID: thisUser._id
    //     }, process.env.SECRET_KEY, {
    //         expiresIn: "1h"
    //     });

    //     //User login checks out
    //     res.status(200).json({
    //         token: token,
    //         expiresIn: 3600,
    //         msg: thisUser
    //     })

    // }).catch((err) => {
    //     return res.status(401).json({
    //         message: "Something went wrong with authentication",
    //         res: err
    //     })
    // });
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
router.get('/users', verifyToken, (req, res) => {
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

        if(user) {
            res.status(200).json({ user: user});            
        }
        else {
            res.status(404).json({ message: "No user found by that id" })
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
    
    // User.findById(req.params.id).exec().then(result => {
    //     if (result) {
    //         res.status(200).json({ user: result });
    //     }
    //     else {
    //         res.status(404).json({ message: "No valid entry found" });
    //     }
    // })
    //     .catch(err => {
    //         res.status(500).json({ message: err });
    //     });
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



/*





const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const server = require('./../server');

router.post("/register", (request, response) => {
    const item = req.body;

    dbConnection.insertOne(item, (err, res) => {
        if(err) throw err;

        dbCollection.find().toArray((_err, _result) => {
            if(_err) throw _err;
            response.json(_result);
        })
    })
})
// const db = 'mongodb+srv://QuoteSystem:CORMupWKD6bxfjGy@quotesystem.qrfhq.mongodb.net/Quote?retryWrites=true&w=majority'


// var client = new MongoClient(db, {useNewUrlParser: true, useUnifiedTopology: true});
// client.connect(err => {
//     const collection = client.db("Quote").collection("users");




//     console.log("Connection established")
//     client.close();
// })



// var server = client.GetServer();
// server.ping();


// mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
// var connection = mongoose.connection;
// connection.on('error', console.error.bind(console, 'MongoDB connection error:'));



// const client = new MongoClient(db, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
//     if(err) {
//         console.log('Error connecting to the MongoDB client ' + err)
//     }
//     else {

//         console.log('Connected successfully')

//         router.get('/', (req, res) => {
//             res.send('From API')
//         })
//     }
// })

// client.connect(err => {
//     if(err) {
//         console.log('Error connecting to the MongoDB client ' + err)
//     }
//     else {
//         console.log('Connected successfully')
//     }
// })

router.get('/', (req, res) => {
    res.send('From API')
})

// mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
//     if(err) {
//         console.log('Error connecting to the MongoDB client ' + err)
//     }
//     else {

//         console.log('Connected successfully')

//         router.post('/register', (req, res, next) => {

//             let userData = req.body
//             let user = new User(userData)
//             user.save((err, registeredUser) => {
//                 if(err) {
//                     console.log(err)
//                 }
//                 else {
//                     res.status(200).send(registeredUser)
//                 }
//             })
//         });
//     }
// })

router.post('/register', (req, res) => {

        let userData = req.body
        let user = new User(userData)
        let collection = 'users'
        collection.insertOne((err, registeredUser) => {
            if(err) {
                console.log(err)
            }
            else {
                res.status(200).send(registeredUser)
            }
        })



        // //Create the user using the hashed password
        // let user = new User({
        //     userName: req.body.userName,
        //     userPassword: hash,
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname,
        //     image: "default"
        // });

        // //Save the user to the database
        // user.save().then((response) => {
        //     res.status(201).json({
        //         message: "Registration successful",
        //         result: response
        //     });
        // }).catch(err => {
        //     res.status(500).json({
        //         error: err
        //     });
        // });



    // //Hash the password
    // bcrypt.hash(req.body.userPassword, 10).then((hash) => {
    //     //Create the user using the hashed password
    //     let user = new User({
    //         userName: req.body.userName,
    //         userPassword: hash,
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname,
    //         image: "default"
    //     });

    //     //Save the user to the database
    //     user.save().then((response) => {
    //         res.status(201).json({
    //             message: "Registration successful",
    //             result: response
    //         });
    //     }).catch(err => {
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
    // });
});

module.exports = router;

// const mysql = require('mysql');
// const User = require('../models/user');
// const bcrypt = require("bcryptjs");
// const authorize = require('../middleware/auth');

// const UserRole = require('../models/user_role')
// const user_role = require('../models/user_role');



//Create a connection to the local mysql server
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'Matt',
//     password : 'Matt',
//     database : 'quote'
// });

//CORMupWKD6bxfjGy

/*

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

router.get('/#', verifyToken, (req, res) => {
    res.sendStatus(200);
})

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

router.get('/user', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];

    let decode = jwt.verify(token, 'secretKey');
    console.log(decode)

    let userID = decode.userID;

    console.log(userID)

    res.status(200).json({
        msg: userID
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

module.exports = router;*/