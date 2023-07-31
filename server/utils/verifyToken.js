const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

//middleware to check(verify) to authorize the user.
//to protect route
//those route can be accessed by that particular logedin user only.

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({
      message: "Unathorized !",
      success: false
    });
  };

  jwt.verify(token, SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        message: "Token is not valid",
        success: false
      });
    }
    req.user = user;//user is the payload that is provided during generating jwt token
    //assign that payload to req.user so that we can use in controller as req.user
    next();
  })
};

module.exports = verifyToken;