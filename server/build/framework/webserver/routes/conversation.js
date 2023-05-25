"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversationController_1 = __importDefault(require("../../../adapters/controllers/conversationController"));
const conversationRepository_1 = require("../../database/mongoDb/repositories/conversationRepository");
const conversationRepositoryInterface_1 = require("../../../application/repositories/conversationRepositoryInterface");
const messagRepository_1 = require("../../database/mongoDb/repositories/messagRepository");
const messageRepositoryInterface_1 = require("../../../application/repositories/messageRepositoryInterface");
const conversationRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, conversationController_1.default)(conversationRepository_1.conversationRepositoryMongoDb, conversationRepositoryInterface_1.conversationRepository, messagRepository_1.messageRepositoryMongoDb, messageRepositoryInterface_1.messageRepository);
    router.post("/", controller.createConversation);
    router.get("/:userId", controller.getConversation);
    return router;
};
exports.default = conversationRoute;
