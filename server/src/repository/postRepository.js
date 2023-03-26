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

}  