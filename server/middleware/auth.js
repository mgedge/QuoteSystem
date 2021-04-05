const jwt = require('jsonwebtoken');

//Hidden keys
require('dotenv/config')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, data) {
          if(err) {
            console.log("JWT Failure: " + err);
            localStorage.removeItem('token');
          }
        });
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Authentication failed" });
    }
};