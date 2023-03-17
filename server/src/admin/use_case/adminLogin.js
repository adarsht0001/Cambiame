const admin = { email: 'Admin', pass: '123' };
module.exports = (repository) => {
  async function execute(email, password) {
    return new Promise((resolve, reject) => {
      if (email == admin.email && password == admin.pass) {
        resolve({ email });
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
