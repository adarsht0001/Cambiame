const express = require('express');
const adminController = require('./controller');
const Database = require('../data_access/user/database');
const UserRepository = require('./repository');

const AdminRoute = () => {
  const database = new Database();
  const userRepository = new UserRepository(database);
  const router = express.Router();
  const controller = adminController(userRepository);

  router.route('/login').post(controller.login);
//   router.route('/signup').post(controller.Signup);

  return router;
};

module.exports = AdminRoute;