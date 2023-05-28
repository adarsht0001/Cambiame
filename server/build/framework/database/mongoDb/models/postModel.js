"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
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
const Post = (0, mongoose_1.model)("posts", postSchema, "posts");
exports.default = Post;
