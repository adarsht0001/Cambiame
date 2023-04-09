module.exports = class UserRepository {
  constructor(database) {
    this.database = database;
  }

  getByName(name) {
    return new Promise(async (resolve, reject) => {
      const user = await this.database.findOne({ username: name });
      if(user){
        resolve(user);
      }
      reject({msg: 'User Not found'});
    });
  }

  getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const user = await this.database.findOne({ email: email });
      if(user){
        resolve(user);
      }
      reject({msg: 'User Not found'});
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
      if(user){
        resolve(user);
      }
      reject({msg: 'User Not found'});
    });
  }

  update(filter, update) {
    return new Promise(async (resolve, reject) => {
      let user = await this.database.updateOne(filter, update);
      resolve(user);
    });
  }
};
