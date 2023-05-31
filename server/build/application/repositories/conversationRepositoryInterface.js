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
exports.conversationRepository = void 0;
const conversationRepository = (repository) => {
    const createConversation = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createConversation(senderId, receiverId); });
    const getConversation = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getConversation(userId); });
    const getSort = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSort(userId); });
    const getBothMembers = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getBothMembers(senderId, receiverId); });
    return {
        createConversation,
        getConversation,
        getBothMembers,
        getSort,
    };
};
exports.conversationRepository = conversationRepository;
