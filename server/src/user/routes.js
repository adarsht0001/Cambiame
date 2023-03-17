const express = require('express');
const userController = require('./controller');
const Database = require('./data_access/database');
const UserRepository = require('./repository');

const UserRoute = () => {
  const database = new Database();
  const repository = new UserRepository(database);
  const router = express.Router();
  const controller = userController(repository);

  router.route('/').get(controller.login);

  return router;
};

module.exports = UserRoute;
