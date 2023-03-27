module.exports = (userRepo, postRepo) => {
  async function execute(id) {
    return new Promise((resolve, reject) => {
      userRepo.getById(id).then((user) => {
        postRepo.getbyUser(user.username).then((posts) => {
          const profile = {
            user,
            posts,
          };
          resolve(profile);
        });
      });
    });
  }
  return { execute };
};
