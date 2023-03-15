const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('users', userschema);
