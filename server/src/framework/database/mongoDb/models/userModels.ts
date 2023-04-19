import { Schema, model } from "mongoose";
const userShema = new Schema({
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
  profile: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
});
const User = model("users", userShema, "users");
export default User;
