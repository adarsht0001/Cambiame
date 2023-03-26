module.exports = class UserRepository {
    constructor(database) {
      this.database = database;
    }

    addPost(post){
      return new Promise(async(resolve, reject) => {
        const insert = await this.database(post).save()
        resolve(insert);
      })
    }

    getPost(){
      return new Promise(async(resolve, reject) => {
        let post = await this.database.find({}).sort({date: -1})
        resolve(post)
      })
    }

    getById(id) {
      return new Promise(async (resolve, reject) => {
        let post = await this.database.findById(id);
        resolve(post);
      });
    }
}  