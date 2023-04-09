module.exports = (userRepo, postRepo) => {
  async function execute(name) {
    return new Promise((resolve, reject) => {
      userRepo.getByName(name).then((user) => {
        if(!user) reject({msg:"user not found"})
        postRepo.getbyUser(user.username).then((posts) => {
          const exist = posts.some((obj) => obj.id === user._id.toString());
          console.log(exist);
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
