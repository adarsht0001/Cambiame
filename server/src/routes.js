const express = require('express');

const UserRoute = require('./user/routes');
const AdminRoute = require('./admin/routes')

const Routes = (dependencies) => {
  const router = express.Router();
  router.use('/', UserRoute(dependencies));
  router.use('/admin',AdminRoute(dependencies))
  return router;
};

module.exports = Routes;
