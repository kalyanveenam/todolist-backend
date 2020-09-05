let jwt = require("jsonwebtoken");
const { config } = require("../config/appConfig");
let secret = config.JWT_SECRET;
let generateToken = (data, callback) => {
  try {
    
    var tokenDetails = {
      token: jwt.sign(data.toJSON(), secret),
      secret: secret,
    };
    callback(null, tokenDetails);
  } catch (err) {
    callback(err, null);
  }
};
module.exports = {
  generateToken: generateToken,
};
