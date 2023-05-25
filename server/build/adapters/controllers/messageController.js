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
const messageController = (messageRepositoryImpl, messageDbrepository) => {
    const messageRepo = messageDbrepository(messageRepositoryImpl());
    const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield messageRepo.addMessage(req.body);
        res.status(200).json(data);
    });
    const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const msg = yield messageRepo.getMessage(req.params.conversationId);
        if (msg) {
            res.json(msg);
        }
        else {
            res.json({ msg: "No message found" });
        }
    });
    return {
        createMessage,
        getMessage,
    };
};
exports.default = messageController;
