"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConversationSchema = new mongoose_1.Schema({
    members: {
        type: Array,
    },
}, { timestamps: true });
const Conversation = (0, mongoose_1.model)("Conversation", ConversationSchema);
exports.default = Conversation;
