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
exports.postRepository = void 0;
const postRepository = (repository) => {
    const getPosts = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPosts(); });
    const addPost = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addPost(data); });
    const getById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getById(id); });
    const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteById(id); });
    const updateById = (id, update) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateById(id, update); });
    const getbyUser = (name) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getbyUser(name); });
    const getbyUserId = (name) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getbyUser(name); });
    const getPostcount = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPostcount(); });
    const getCountof = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCountof(filter); });
    const postByfilter = (filter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.postByfilter(filter);
    });
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
        getbyUserId,
    };
};
exports.postRepository = postRepository;
