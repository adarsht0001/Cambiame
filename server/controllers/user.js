let users = require('../model/userSchema');
const bcrypt = require('bcrypt');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userNameCheck = await users.findOne({ name });
      if (userNameCheck) {
        return res.json({ msg: 'username already exists', status: false });
      }
      const emailCheck = await users.findOne({ email });
      if (emailCheck) {
        return res.json({ msg: 'email already exists', status: false });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await users.create({
        email,
        username: name,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      const userCheck = await users.findOne({ email });
      if (!userCheck) {
        return res.json({
          msg: 'incorrect username or password',
          status: false,
        });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        userCheck.password
      );
      if (!isPasswordValid) {
        return res.json({
          msg: 'incorrecr username or password',
          status: false,
        });
      }
      if (isPasswordValid && userCheck) {
        console.log('logged');
        delete userCheck.password;
        return res.json({ msg: 'loggin succesfull', status: true, userCheck });
      }
    } catch (err) {
      next(err);
    }
  },
};
