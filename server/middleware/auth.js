const jwt = require('jsonwebtoken');
// const environment = require("../../src/environments/environment");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'secretKey', function(err, data) {
          if(err) {
            console.log("JWT Failure: " + err);
            localStorage.removeItem('token');
          }
        }); //bad practice...key should be environment variable
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Authentication failed" });
    }
};


/*
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
      }

      let token = req.headers.authorization.split(' ')[1];

      if(token === 'null') {
        return res.status(401).send('Unauthorized request');
      }
      
      let payload = jwt.verify(token, 'secretKey');

      if(!payload) {
        return res.status(401).send('Unauthorized request'); 
      }

      req.userId = payload.subject

      next()
}*/