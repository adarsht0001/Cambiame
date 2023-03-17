const adminLogin = require('./use_case/adminLogin');

module.exports = (repository) => {
  const login = (req, res) => {
    const Login = adminLogin();
    const { email, password } = req.body;
    Login.execute(email, password)
      .then((user) => {
        return res.status(201).json({ status: true, user });
      })
      .catch((err) => {
        return res.status(404).json({ ...err, status: false });
      });
  };
  return {
    login,
  };
};
