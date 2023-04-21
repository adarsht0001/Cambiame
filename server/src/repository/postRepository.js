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
      try {
        let post = await this.database.findById(id)
        resolve(post);
        
      } catch (error) {
        console.log(error)
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      const deletedPost = await this.database.findByIdAndDelete(id);
      resolve(deletedPost);
    });
  }

  updateone(filter, update) {
    return new Promise(async(resolve, reject) => {
      const updated =await this.database.findByIdAndUpdate(filter, update);
      resolve(updated);
    });
  }

  getbyUser(name) {
    return new Promise(async (resolve, reject) => {
      const posts = await this.database.find({ user: name });
      resolve(posts);
    });
  }
};
