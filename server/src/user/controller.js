const loginUser = require('./use_case/loginUser');
const signup = require('./use_case/addUser');
const forgottenPass = require('./use_case/forgotpassword');
const resetPassword = require('./use_case/resetPassword');

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

  const forgotPass = (req, res) => {
    const forgot = forgottenPass(repository);
    const { email } = req.body;
    forgot
      .execute(email)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return res.status(401).json({ ...err, status: false });
      });
  };

  const resetPass = (req, res) => {
    const resetpasscase = resetPassword(repository);
    const { id, token } = req.params;
    const {pass} = req.body
    resetpasscase.execute(id,token,pass).then((res)=>{
        return res.status(201).json({ status: true,...res })
    }).catch((err)=>console.log(err))
  };
  return {
    login,
    Signup,
    forgotPass,
    resetPass,
  };
};
