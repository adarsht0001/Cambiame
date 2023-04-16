module.exports = (userRepo, postRepo) => {
  async function execute(name) {
    return new Promise((resolve, reject) => {
      userRepo.getByName(name).then((user) => {
        if(!user) reject({msg:"user not found"})
        postRepo.getbyUser(user.username).then((posts) => {
          const profile = {
            user,
            posts,
          };
          resolve(profile);
        });
      }).catch((err)=>{
      reject(err);
      })
    });
  }
  return { execute };
};
