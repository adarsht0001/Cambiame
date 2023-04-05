const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(401).json({ msg: 'Invalid Token' });
  jwt.verify(token, process.env.ACESS_TOKEN_SCERET, (err, user) => {
    if (err)
      return res.status(401).json({ msg: 'Invalid Token' });
    next();
  });
}

module.exports= {authenticateToken}