/* eslint-disable no-constructor-return */
const mongoose = require('mongoose');

module.exports = class Database {
  constructor(connection) {
    this.connection = connection;
    this.connected = false;

    return mongoose.connect(this.connection, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
  }
};
