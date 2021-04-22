/***************************************************
 * API.js
 * 
 * This file utilizes the traditional RESTful calls
 * to retrieve data from the database.
 * 
 * For example, auth.service will call the HTTP 
 * methods to register/login users. For login, this file
 * will send the HTTP GET method to the server to find 
 * the user's data using the user's username and password. 
 * Once verified, a JWT is signed and returned to the caller.
 * 
 **************************************************/


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
const Quote = require('../models/quotes');
const Item = require('../models/item');
const { Mongoose } = require('mongoose');
const item = require('../models/item');
const { Customer } = require('../external');
const { Part } = require('../external');

/**************************************************/
/*               END OF CONFIGURATION             */
/**************************************************/


//Sample get call for testing connection
router.get('/', (req, res) => {
    res.send('From API')
});

//Verifies the user's token
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

// POST : Registration
// Hashes the entered password, then attempts to save the 
// account to the database
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

// POST : New Quote
// Attemps to save a new quote to the database
router.post('/newQuote', (req, res) => {
  const quote = new Quote({
    quoteID: req.body.quoteID,
    username: req.body.username,
    customer: req.body.customer,
    contact: req.body.contact,
    items: req.body.item1,
    status: req.body.status,
    discount: req.body.discount
    });

      //Save the user to the database
      quote.save().then((response) => {
          res.status(201).json({
              message: "Registration successful",
              new_quote: response
          });

          console.log(response);
      }).catch(err => {
          res.status(500).json({
              error: err
          });
  });
});

// DELETE: Delete user
// Deletes user by id
router.route('/deleteuser/:id').delete((req, res, next) => {
    // console.log('API deleting (' + req.params.id + ')')
    User.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// DELETE: Delete quote
// Deletes quote by id
router.route('/deletequote/:id').delete((req, res, next) => {
    // console.log('API deleting (' + req.params.id + ')')
    Quote.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// GET the requested user data
// Returns the user data
router.route('/loaduser/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

// GET the requested quote data
// Returns the quote data
router.route('/loadquote/:id').get((req, res) => {
    Quote.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

// PUT the new user data by id
router.route('/updateuser/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    })
  })

// PUT the new quote data by id
router.route('/updatequote/:id').put((req, res, next) => {
    Quote.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    })
  })
  

// POST : Login authentication
// Finds the username then password from the database.
// If the password does not match the database password login attempt fails
// Otherwise, sign a token and give it to the user
router.post('/login', (req, res) => {
    let thisUser;

    //Find the username in the database
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
            return res.status(404).json({
                message: "Invalid credentials"
            });
        }
    }).catch(err => {
        return res.status(404).json({
            message: "Invalid credentials"
        });
    });
});

// Verifies token for dashboard
router.get('/#', verifyToken, (req, res) => {
    res.sendStatus(200);
})

// GET the logged in user's id and username from the token
// Returns the userID
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

// GET All Users (employees) and their data
// Returns JSON array of all users in database
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
// Returns the user's data from the id
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

// GET the user role info from the user_role table
// Returns json object of the row where passed id is requested
router.route('/user/role/:id').get((req, res) => {
    User.findOne({ where: { role_id: req.params.id } }).then((user) => {
        //console.log("The user role is: " + user.role_id)

        res.status(200).json({
            msg: user
        })

        //return user.role_id;
    });
});

// GET All Quotes and their data
// Returns JSON array of all quotes in database
router.get('/quotes', (req, res) => {
    Quote.find().exec().then(result => {
        res.status(200).json(result);
    })
        .catch(err => {
            res.status(500).json({ error: err })
        });
})

// GET All Items and their prices
// Returns JSON array of all quotes in database
router.get('/items', (req, res) => {
    Item.find().exec().then(result => {
        res.status(200).json(result);
    })
        .catch(err => {
            res.status(500).json({ error: err })
        });
})

/**************************************************/
/*              EXTERNAL DATABASE                 */
/**************************************************/
// GET All customers and their properties from the external dB
// Returns JSON array of all customers
router.get('/customers', (req, res) => {
  Customer.findAll({
    attributes: [
      'id', 'name', 'city', 'street', 'contact'
    ]
  }).then((customers) => {
    res.status(200).json(customers);
  })
  .catch(err=> {
    res.status(500).json({error: err});
  });
})

// GET All parts and their properties from the external dB
// Returns JSON array of all parts
router.get('/parts', (req, res) => {
  Part.findAll({
    attributes: [
      'number', 'description', 'price', 'weight', 'pictureURL'
    ]
  }).then((parts) => {
    res.status(200).json(parts);
  })
  .catch(err=> {
    res.status(500).json({error: err});
  });
})
module.exports = router;