module.exports = class UserRepository {
  constructor(database) {
    this.database = database;
  }

  getByName(name) {
    return new Promise(async (resolve, reject) => {
      const user = await this.database.findOne({ username: name });
      resolve(user)
    });
  }

  getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const user = await this.database.findOne({ email: email });
      resolve(user)
    });
  }

  adduser(user){
    return new Promise(async(resolve, reject) => {
        let data = await this.database(user).save()
        resolve(user)
    })
  }
};
