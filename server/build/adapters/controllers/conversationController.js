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
Object.defineProperty(exports, "__esModule", { value: true });
const conversationController = (conversationRepositoryImpl, conversationDbrepository, messageRepositoryImpl, messageDbrepository) => {
    const conversationRepo = conversationDbrepository(conversationRepositoryImpl());
    const messageRepo = messageDbrepository(messageRepositoryImpl());
    const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Exist = yield conversationRepo.getBothMembers(req.body.senderId, req.body.receiverId);
        if ((Exist === null || Exist === void 0 ? void 0 : Exist.length) > 0) {
            res.json(Exist[0]);
        }
        else {
            const data = yield conversationRepo.createConversation(req.body.senderId, req.body.receiverId);
            res.json(data);
        }
    });
    const getConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const conversations = yield conversationRepo.getConversation(req.params.userId);
        for (let conversation of conversations) {
            const message = yield messageRepo.getLastMessage(conversation === null || conversation === void 0 ? void 0 : conversation._id);
            conversation.set("message", message, { strict: false });
        }
        res.json(conversations);
    });
    return {
        createConversation,
        getConversation,
    };
};
exports.default = conversationController;
