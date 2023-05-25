"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagRepository_1 = require("../../database/mongoDb/repositories/messagRepository");
const messageRepositoryInterface_1 = require("../../../application/repositories/messageRepositoryInterface");
const messageController_1 = __importDefault(require("../../../adapters/controllers/messageController"));
const messageRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, messageController_1.default)(messagRepository_1.messageRepositoryMongoDb, messageRepositoryInterface_1.messageRepository);
    router.post("/", controller.createMessage);
    router.get("/:conversationId", controller.getMessage);
    return router;
};
exports.default = messageRoute;
