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
exports.postRepositoryMongoDB = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const postRepositoryMongoDB = () => {
    const getPosts = () => __awaiter(void 0, void 0, void 0, function* () { return yield postModel_1.default.find({}).sort({ date: -1 }); });
    const addPost = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield postModel_1.default.create(data); });
    const getById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield postModel_1.default.findById(id); });
    const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield postModel_1.default.findByIdAndDelete(id); });
    const updateById = (id, update) => __awaiter(void 0, void 0, void 0, function* () { return yield postModel_1.default.findByIdAndUpdate(id, update); });
    const getbyUser = (name) => __awaiter(void 0, void 0, void 0, function* () { return yield postModel_1.default.find({ user: name }); });
    const getPostcount = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield postModel_1.default.countDocuments();
    });
    const getCountof = (filter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield postModel_1.default.countDocuments(filter);
    });
    const postByfilter = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield postModel_1.default.find(filter); });
    return {
        getPosts,
        addPost,
        getById,
        deleteById,
        updateById,
        getbyUser,
        getPostcount,
        getCountof,
        postByfilter,
    };
};
exports.postRepositoryMongoDB = postRepositoryMongoDB;
