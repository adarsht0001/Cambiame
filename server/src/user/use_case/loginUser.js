const { createToken } = require('../../helper/jwt');
const bcrypt = require('bcrypt');

module.exports = (repository) => {
  async function execute(email, userpass) {
    return repository.getByEmail(email).then((res) => {
      return new Promise(async (resolve, reject) => {
        if (res) {
          const isPasswordValid = await bcrypt.compare(userpass, res.password);
          if (!isPasswordValid) {
            reject({
              msg: 'incorrect password',
              password: true,
            });
          }
          const { username, email } = res;
          const accesToken = createToken(username);
          const user = {
            email,
            username,
            accesToken,
          };
          resolve(user);
        } else {
          reject({
            msg: 'Invalid User',
            email: true,
          });
        }
      });
    });
  }
  return { execute };
};
