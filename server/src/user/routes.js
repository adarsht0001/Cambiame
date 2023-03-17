const express = require('express');
const userController = require('./controller');
const Database = require('../data_access/user/database');
const UserRepository = require('./repository');

const UserRoute = () => {
  const database = new Database();
  const repository = new UserRepository(database);
  const router = express.Router();
  const controller = userController(repository);

  router.route('/login').post(controller.login);
  router.route('/signup').post(controller.Signup);

  return router;
};

module.exports = UserRoute;
