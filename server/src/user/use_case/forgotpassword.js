const { forgot } = require('../../helper/jwt');
const { transport } = require('../../helper/sendMail');

require('dotenv').config();

module.exports = (repository) => {
  async function execute(email) {
    return repository.getByEmail(email).then((res) => {
      return new Promise(async (resolve, reject) => {
        if (res) {
          const secret = process.env.JWT_SECRECT + res.password;
          const payload = {
            email: res.email,
            _id: res._id,
          };
          const token = forgot(payload, secret);
          const link = `http://localhost:3000/resetpassword/${res._id}/${token}`;
          const mailOpt = {
            from: 'Cambiame <Cambiame@gmail.com>',
            to: 'adarsht00001@gmail.com',
            subject: 'RESET PASSWORD',
            text: `Your Reset Password Link is:${link}`,
            html: `<hi>Your Reset Password Link is:${link}</h1>`,
          };
          
          let result = await transport(mailOpt);
          resolve()
        } else {
          reject({
            msg: 'User Not Found',
            email: true,
          });
        }
      });
    });
  }
  return { execute };
};
