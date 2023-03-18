const bcrypt = require('bcrypt');
const userEntity = require('../entity');
const { transport } = require('../../helper/sendMail');
const { onetime } = require('../../helper/jwt');

require('dotenv').config();

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
              let data = await repository.adduser(user);
              const secret = process.env.JWT_SECRECT + hashedPassword;
              const payload = {
                email: data.email,
                _id: data._id,
              };
              const token = onetime(payload, secret);
              const link = `http://localhost:3000/verifyemail/${data._id}/${token}`
              const mailOpt = {
                from: 'Cambiame <Cambiame@gmail.com>',
                to: 'adarsht00001@gmail.com',
                subject: 'Verificaton Link',
                text: `Your Verificaton Link is:${link}`,
                html: `<hi>Your Verificaton Link Link is:${link}</h1>`,
              };
              let result = await transport(mailOpt);
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
