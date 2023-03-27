const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedby: {
    type: Array,
    default: [],
  },
  comment: {
    type: Object,
  },
  report: {
    type: Object,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
});
