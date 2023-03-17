module.exports = class UserRepository {
  constructor(database) {
    this.database = database;
  }

  getByName(name) {
    return new Promise(async (resolve, reject) => {
      const user = await this.database.findOne({ username: name });
      if (user) {
        resolve(user);
      } else {
        reject('User Not Found');
      }
    });
  }

  getByEmail(email) {
    return new Promise(async(resolve, reject) => {
      const user =await this.database.findOne({ email });
      console.log(user);
      if (user) {
        resolve(user);
      } else {
        reject('User Not Found');
      }
    });
  }
};
