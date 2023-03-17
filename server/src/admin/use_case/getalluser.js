module.exports = (repository) => {
  async function execute() {
    return new Promise((resolve, reject) => {
        repository.getAll().then((users)=>{
            resolve(users)
        })
    });
  }
  return {execute}
};
