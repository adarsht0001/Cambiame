
const { verify } = require('../../helper/jwt');

module.exports = (repository) => {
  async function execute(id, token) {
    return repository.getById(id).then((res) => {
      return new Promise(async(resolve, reject) => {
        if (res) {
          const secret = process.env.JWT_SECRECT + res.password;
          const payload = verify(token, secret);
          if(payload.expired){
            reject(payload)
          }else{
            await repository.update({email:payload.email},{verified:true})
            resolve({msg:"Status changed"})
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
