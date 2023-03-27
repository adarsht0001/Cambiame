module.exports = (postRepo) => {
  async function execute(userId, postId) {
    return new Promise((resolve, reject) => {
      postRepo.getById(postId).then((post) => {
        const exist = post.reportedby.some((obj) => obj === userId);
        if (exist) {
          resolve({ msg: "Already reported" });
        } else {
          const filter = post._id;
          const update = {
            $push: { reportedby: userId },
            $inc: { report: +1 },
          };
          postRepo.updateone(filter, update);
          resolve({ msg: "Reported SuccesFully" });
        }
      });
    });
  }
  return { execute };
};
