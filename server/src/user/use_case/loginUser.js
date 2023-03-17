const user = require('../entity');

module.exports = (repository) => {
  async function execute(email) {
    return repository.getByEmail(email);
  }
  return { execute };
};
