const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  caption:{
    type:String,
    required:true,
  },
  image:{
    type:String
  },
  like: {
    type: Number,
    default:0
  },
  comment: {
    type: Object,
  },
  report: {
    type: Object,
  },
  hidden:{
    type:Boolean,
    default:false,
  },
  date:{
    type:Date
  }
});
