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
exports.messageRepositoryMongoDb = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const messageRepositoryMongoDb = () => {
    const addMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = new Message_1.default(data);
        return newMessage.save();
    });
    const getMessages = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Message_1.default.find({
            conversationId: id,
        });
    });
    const getLastMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const LastMessage = yield Message_1.default.findOne({ convesationId: id }).sort({
            createdAt: -1,
        });
        return LastMessage;
    });
    return {
        addMessage,
        getMessages,
        getLastMessage,
    };
};
exports.messageRepositoryMongoDb = messageRepositoryMongoDb;
