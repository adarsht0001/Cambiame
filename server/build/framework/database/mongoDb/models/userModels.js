"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userShema = new mongoose_1.Schema({
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
    profilePhoto: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
    },
});
const User = (0, mongoose_1.model)("users", userShema, "users");
exports.default = User;
