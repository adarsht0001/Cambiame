const { uploadtoS3 } = require('../../helper/awsS3');
const postEntity = require('../../entity/postEntity')

module.exports = (repository) => {
  async function execute(email,caption,file) {
    return new Promise(async(resolve, reject) => {
        const date = new Date()
        if(file){
            uploadtoS3(file.buffer,email).then(async(path)=>{
                    let post = new postEntity(email,caption,path,date)
                    await repository.addPost(post)
                    resolve({
                        msg:"post added"
                    })
                }).catch((err)=>{
                    reject(err);
                })
        }else{
            let post = new postEntity(email,caption,path=null,date)
            await repository.addPost(post)
            resolve({
                msg:"post added"
            })
        }
        
    })
    // return repository.getById(id).then((res) => {
    //   return new Promise(async(resolve, reject) => {})})
    }
    return { execute };
}