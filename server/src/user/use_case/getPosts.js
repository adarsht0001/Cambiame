const { getObjectSignedUrl } = require("../../helper/awsS3");

module.exports = (repository) => {
  async function execute() {
    return new Promise(async (resolve, reject) => {
      repository.getPost().then(async (posts) => {
        for (let post of posts) {
          console.log(Object.isSealed(post));
          if (post.image) {
            let url = await getObjectSignedUrl(post.image);
            post.set("link", url, { strict: false });
            // post['link'] = url
          }
        }
        resolve(posts);
      });
    });
  }
  return { execute };
};
