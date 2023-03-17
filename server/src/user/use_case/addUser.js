const bcrypt = require('bcrypt');
const userEntity = require('../entity');

module.exports = (repository) => {
  async function execute(username, email, password) {
    return repository.getByName(username).then((res) => {
      return new Promise((resolve, reject) => {
        if (!res) {
          return repository.getByEmail(email).then(async (mail) => {
            if (mail) {
              reject({
                msg: 'email already exists',
                email: true,
              });
            } else {
              const hashedPassword = await bcrypt.hash(password, 10);
              const user = new userEntity(username, email, hashedPassword);
              repository.adduser(user);
              console.log(user);
              resolve(user);
            }
          });
        } else {
          reject({
            msg: 'username already exists',
            name: true,
          });
        }
      });
    });
  }
  return { execute };
};
