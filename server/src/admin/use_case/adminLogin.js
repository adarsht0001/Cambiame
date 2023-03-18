const { createToken } = require('../../helper/jwt');
const admin = { email: 'Admin', pass: '123' };
module.exports = () => {
  async function execute(email, password) {
    return new Promise((resolve, reject) => {
      if (email == admin.email && password == admin.pass) {
        const accesToken = createToken(email);
        const user ={
          email,
          accesToken
        }
        resolve(user);
      } else {
        if (email !== admin.email) {
          reject({ msg: 'Invalid name', name: true });
        }
        reject({ msg: 'Invalid password', password: true });
      }
    });
  }
  return { execute };
};
