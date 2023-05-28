import { Schema, model } from "mongoose";

const postSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  Date: {
    type: Date,
    required: false,
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
    type: Number,
    default: 0,
  },
  reportedby: {
    type: Array,
    default: [],
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
  comments: {
    type: Array,
    default: [],
  },
});
const Post = model("posts", postSchema, "posts");
export default Post;
