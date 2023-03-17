const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  createToken: (user) => {
    return jwt.sign({ token: user }, process.env.ACESS_TOKEN_SCERET);
  },
  forgot: (payload, secret) => {
    return jwt.sign(payload, secret, { expiresIn: '15m' });
  },
  verify: (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return ({
        msg:"Link Expired",
        expired:true
      })
    }
  },
};
