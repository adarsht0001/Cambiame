"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationRepositoryMongoDb = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const conversationRepositoryMongoDb = () => {
    const createConversation = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
        const newConversation = new Conversation_1.default({
            members: [senderId, receiverId],
        });
        return yield newConversation.save();
    });
    const getConversation = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const conversation = yield Conversation_1.default.find({
            members: { $in: [userId] },
        });
        return conversation;
    });
    const getBothMembers = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield Conversation_1.default.find({
            members: { $all: [senderId, receiverId] },
        });
        return data;
    });
    return {
        createConversation,
        getConversation,
        getBothMembers,
    };
};
exports.conversationRepositoryMongoDb = conversationRepositoryMongoDb;
