module.exports = class UserRepository {
  constructor(database) {
    this.database = database;
  }

  addPost(post) {
    return new Promise(async (resolve, reject) => {
      const insert = await this.database(post).save();
      resolve(insert);
    });
  }

  getPost() {
    return new Promise(async (resolve, reject) => {
      let post = await this.database.find({}).sort({ date: -1 });
      resolve(post);
    });
  }

  getById(id) {
    return new Promise(async (resolve, reject) => {
      let post = await this.database.findById(id);
      resolve(post);
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      const deletedPost = await this.database.findByIdAndDelete(id);
      resolve(deletedPost);
    });
  }

  updateone(filter, update) {
    return new Promise((resolve, reject) => {
      const updated = this.database.findByIdAndUpdate(filter, update);
      resolve(updated);
    });
  }
};
