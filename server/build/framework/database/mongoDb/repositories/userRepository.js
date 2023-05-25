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
exports.userRepositoryMongoDB = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const userRepositoryMongoDB = () => {
    const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModels_1.default.findOne({ email: email });
    });
    const getByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModels_1.default.findOne({ username: name });
    });
    const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModels_1.default.findById(id);
    });
    const adduser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModels_1.default.create(user);
    });
    const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModels_1.default.updateOne(filter, update);
    });
    const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () { return yield userModels_1.default.find({}); });
    const findByRegex = (char) => __awaiter(void 0, void 0, void 0, function* () {
        let regex = new RegExp("^" + char, "i");
        return yield userModels_1.default.find({ username: { $regex: regex } });
    });
    const getUsercount = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModels_1.default.countDocuments();
    });
    const getCountof = (filter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModels_1.default.countDocuments(filter);
    });
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
exports.userRepositoryMongoDB = userRepositoryMongoDB;
