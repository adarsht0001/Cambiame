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
exports.userRepository = void 0;
const userRepository = (repository) => {
    const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return repository.getByEmail(email); });
    const getByName = (name) => __awaiter(void 0, void 0, void 0, function* () { return repository.getByName(name); });
    const getById = (id) => __awaiter(void 0, void 0, void 0, function* () { return repository.getById(id); });
    const adduser = (user) => __awaiter(void 0, void 0, void 0, function* () { return repository.adduser(user); });
    const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () { return repository.updateOne(filter, update); });
    const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllUser(); });
    const findByRegex = (char) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findByRegex(char); });
    const getUsercount = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUsercount(); });
    const getCountof = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCountof(filter); });
    return {
        getByEmail,
        getByName,
        getById,
        adduser,
        updateOne,
        getAllUser,
        findByRegex,
        getUsercount,
        getCountof,
    };
};
exports.userRepository = userRepository;
