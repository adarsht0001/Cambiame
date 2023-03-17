const express = require('express');

const UserRoute = require('./user/routes');

const Routes = (dependencies) => {
  const router = express.Router();
  router.use('/', UserRoute(dependencies));
  return router;
};

module.exports = Routes;
