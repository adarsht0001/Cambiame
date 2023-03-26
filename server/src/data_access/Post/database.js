/* eslint-disable no-constructor-return */
const mongoose = require('mongoose');
const schema = require('./Schema');

module.exports = class StudentDatabase {
  constructor() {
    return mongoose.model('post', schema);
  }
};
