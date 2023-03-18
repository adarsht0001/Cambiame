const bcrypt = require('bcrypt');
require('dotenv').config();

const { verify } = require('../../helper/jwt');
module.exports = (repository) => {
  async function execute(id, token,password) {
    return repository.getById(id).then((res) => {
      return new Promise(async(resolve, reject) => {
        if (res) {
            const secret = process.env.JWT_SECRECT + res.password;
            const payload=verify(token,secret)
            if(payload.expired){
                reject(payload)
            }else{
                const hashedPassword = await bcrypt.hash(password, 10)
                await repository.update({email:payload.email},{password:hashedPassword})
                resolve({msg:"password changed"})
            }
        } else {
          reject({
            msg: 'User Not Found',
          });
        }
      });
    });
  }
  return { execute };
};
