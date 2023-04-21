module.exports = class UserRepository {
  constructor(database) {
    this.database = database;
  }

  getByName(name) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.database.findOne({ username: name });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const user = await this.database.findOne({ email: email });
      resolve(user);
    });
  }

  adduser(user) {
    return new Promise(async (resolve, reject) => {
      let insert = await this.database(user).save();
      resolve(insert);
    });
  }

  getById(id) {
    return new Promise(async (resolve, reject) => {
      let user = await this.database.findById(id);
      resolve(user);
    });
  }

  update(filter, update) {
    return new Promise(async (resolve, reject) => {
      let user = await this.database.updateOne(filter, update);
      resolve(user);
    });
  }

  findByRegex(chars){
    return new Promise(async(resolve, reject) => {
      let regex = new RegExp('^' + chars, 'i');
      let users = await this.database.find({username:{$regex:regex}})
      resolve(users)
    })
  }
  find(){
    return new Promise(async(resolve, reject) => {
      let users = await this.database.find({})
      resolve(users)
    })
  }
};
