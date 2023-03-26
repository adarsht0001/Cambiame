const { deleteFile } = require("../../helper/awsS3");

module.exports = (repository) => {
  async function execute(id) {
    return new Promise((resolve, reject) => {
      try {
        repository.delete(id).then(async (post) => {
          await deleteFile(post.image);
          repository.delete(id);
          resolve({
            msg: "post deleted",
          });
        });
      } catch (error) {
        reject(err);
      }
    });
  }
  return { execute };
};
