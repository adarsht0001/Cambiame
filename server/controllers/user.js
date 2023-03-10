let users = require('../model/userSchema');
const bcrypt = require('bcrypt');
const { createToken } = require('../helper/jwt');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userNameCheck = await users.findOne({ name });
      if (userNameCheck) {
        return res.status(401).json({ msg: 'username already exists', status: false });
      }
      const emailCheck = await users.findOne({ email });
      if (emailCheck) {
        return res.status(401).json({ msg: 'email already exists', status: false });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await users.create({
        email,
        username: name,
        password: hashedPassword,
      })
      delete user.password;
      return res.status(201).json({ status: true, user });
    } catch (err) {
      res.status(500)
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userCheck = await users.findOne({ email });
      if (!userCheck) {
        return res.status(404).json({
          msg: 'Invalid User',
          email:true,
          status: false,
        });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        userCheck.password
      );
      if (!isPasswordValid) {
        return res.status(404).json({
          msg: 'incorrect password',
          password:true,
          status: false,
        });
      }
      if (isPasswordValid && userCheck) {
        const {email,username}=userCheck
        const accesToken=createToken(username)
        const user={
            email,
            username,
            accesToken
        }
        return res.status(200).json({ msg: 'loggin succesfull', status: true, user });
      }
    } catch (err) {
       res.status(500)
    }
  },
};
