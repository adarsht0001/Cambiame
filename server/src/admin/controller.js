const adminLogin = require('./use_case/adminLogin');
const Users = require('./use_case/getalluser');
const blockUser = require('./use_case/blockuser');

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

  const users = (req, res) => {
    const UserCase = Users(repository);
    UserCase.execute().then((data) => {
      let users = data.map((e) => {
        return {
          id: e['_id'],
          name: e['username'],
          email: e['email'],
          status: e['blocked'],
        };
      });
      res.status(200).json(users);
    });
  };

  block = (req, res) => {
    const blockcase = blockUser(repository);
    const { email } = req.body;
    blockcase.execute(email).then(()=>{
      res.sendStatus(200)
    })
  };
  return {
    login,
    users,
    block
  };
};
