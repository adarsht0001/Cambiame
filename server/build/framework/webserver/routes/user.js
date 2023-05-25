"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../adapters/controllers/userController"));
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const userRepositoryInterface_1 = require("../../../application/repositories/userRepositoryInterface");
const postRepository_1 = require("../../database/mongoDb/repositories/postRepository");
const postRepositoryInterface_1 = require("../../../application/repositories/postRepositoryInterface");
const userRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(userRepository_1.userRepositoryMongoDB, userRepositoryInterface_1.userRepository, postRepository_1.postRepositoryMongoDB, postRepositoryInterface_1.postRepository);
    router.get("/profile/:name", controller.getProfile);
    router.get("/search", controller.searchUsername);
    router.get("/search-user/:name/:user", controller.searchResult);
    router.put("/follow/:name", controller.follow);
    router.get("/user/:id", controller.getUser);
    return router;
};
exports.default = userRoute;
