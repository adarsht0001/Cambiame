"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const post_1 = __importDefault(require("./post"));
const user_1 = __importDefault(require("./user"));
const conversation_1 = __importDefault(require("./conversation"));
const message_1 = __importDefault(require("./message"));
const router = (app) => {
    app.use("/api/", (0, auth_1.default)(), (0, user_1.default)());
    app.use("/api/admin", (0, admin_1.default)());
    app.use("/api/post", (0, post_1.default)());
    app.use("/api/conversation", (0, conversation_1.default)());
    app.use("/api/message", (0, message_1.default)());
};
exports.default = router;
