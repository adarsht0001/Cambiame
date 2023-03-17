module.exports = class UserRepository {
  constructor(database) {
    this.database = database;
  }

  getAll (){
    return new Promise(async(resolve, reject) => {
      let users = await this.database.find({})
      resolve(users)
      
    })
  }

  update(filter,update){
    return new Promise(async(resolve, reject) => {
        let user = await this.database.updateOne(filter,update)
        resolve(user)
    })
  }

  getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const user = await this.database.findOne({ email: email });
      resolve(user)
    });
  }
};
