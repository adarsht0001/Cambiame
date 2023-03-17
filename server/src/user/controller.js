const loginUser = require('./use_case/loginUser');
const signup = require('./use_case/addUser');

module.exports = (repository) => {
  const login = (req, res) => {
    const loginUsercase = loginUser(repository);
    const { email, password } = req.body;
    loginUsercase
      .execute(email, password)
      .then((user) => {
        return res.status(201).json({ status: true, user });
      })
      .catch((err) => {
        return res.status(404).json({ ...err, status: false });
      });
  };

  const Signup = (req, res) => {
    const Signupcase = signup(repository);
    const { email, name, password } = req.body;
    Signupcase.execute(name, email, password)
      .then((user) => {
        delete user.password;
        return res.status(201).json({ status: true, user });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ ...err, status: false });
      });
  };

  return {
    login,
    Signup,
  };
};
