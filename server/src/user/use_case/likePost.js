module.exports = (userRepo, postRepo) => {
  async function execute(userId, postId) {
    return new Promise((resolve, reject) => {
      postRepo.getById(postId).then(async (post) => {
        const liked = post.get("likedby");
        const exist = liked.some((obj) => obj.id === userId);
        const filter = post._id;
        if (exist) {
          const update = {
            $pull: { likedby: { id: userId } },
            $inc: { likes: -1 },
          };
          postRepo.updateone(filter, update).then(() => {
            resolve({ msg: "un-liked post" });
          });
        } else {
          const data = await userRepo.getById(userId);
          const user = {
            id: data._id.toString(),
            name: data.username,
            profile: data.profile,
          };
          const update = { $push: { likedby: user }, $inc: { likes: +1 } };
          postRepo.updateone(filter, update);
          resolve({ msg: "liked the post" });
        }
      });
    });
  }
  return { execute };
};
