let users = require('../model/userSchema');
const admin = { email: 'Admin', pass: '123' };

module.exports = {
  adminLogin: (req, res) => {
    const { email, password } = req.body;
    if (email == admin.email && password == admin.pass) {
      console.log('login sucess');
      res.status(200).json({ msg: 'login Sucess' });
    } else {
      if (email !== admin.email) {
        return res
          .status(401)
          .json({ msg: 'Invalid name', name: true, status: false });
      } else {
        return res
          .status(401)
          .json({ msg: 'Invalid password', password: true, status: false });
      }
    }
  },
  users: async (req, res, next) => {
    const data = await users.find({});
    res.status(200).json({ data: data });
  },
  block: async (req, res, next) => {
    const email = req.body.data.email;
    await users.updateOne({ email: email }, { $set: { status: false } });
    res.status(200)
  },
};
