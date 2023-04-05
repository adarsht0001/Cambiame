import { verify } from 'jsonwebtoken';
require('dotenv').config();

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(401).json({ msg: 'Invalid Token' });
  verify(token, process.env.ACESS_TOKEN_SCERET, (err, user) => {
    if (err)
      return res.status(401).json({ msg: 'Invalid Token' });
    next();
  });
}
