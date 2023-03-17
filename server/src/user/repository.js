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
        this.database(user).save()
        resolve(user)
    })
  }

  getById(id){
    return new Promise(async(resolve, reject) => {
        let user = await this.database.findById(id)
        resolve(user)
    })
  }

  update(filter,update){
    return new Promise(async(resolve, reject) => {
        let user = await this.database.updateOne(filter,update)
        resolve(user)
    })
  }

};
