const loginUser = require('./use_case/loginUser');

module.exports = (repository) => {
  const login = (req, res) => {
    const loginUsercase = loginUser(repository)
    loginUsercase.execute('a.com')
        .then((res)=>console.log(res))
        .catch((err) => {
        console.log(err);
    });
    res.send('hello');
  };

  return {
    login,
  };
};
