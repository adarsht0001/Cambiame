module.exports = (repository) => {
  async function execute(email) {
    return new Promise((resolve, reject) => {
      repository.getByEmail(email).then((user) => {
        repository.update({ email }, { blocked: !user.blocked }).then((users) => {
          resolve(users);
        });
      });
    });
  }
  return { execute };
};
