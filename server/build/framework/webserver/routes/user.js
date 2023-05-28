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
const multer_1 = __importDefault(require("multer"));
const s3Service_1 = require("../../services/s3Service");
const s3serviceInterface_1 = require("../../../application/services/s3serviceInterface");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const userRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(userRepository_1.userRepositoryMongoDB, userRepositoryInterface_1.userRepository, postRepository_1.postRepositoryMongoDB, postRepositoryInterface_1.postRepository, s3Service_1.s3Service, s3serviceInterface_1.s3ServiceInterface);
    router.get("/profile/:name", controller.getProfile);
    router.get("/search", controller.searchUsername);
    router.get("/search-user/:name/:user", controller.searchResult);
    router.put("/follow/:name", controller.follow);
    router.get("/user/:id", controller.getUser);
    router.post("/edit-profile", upload.any(), controller.editProfile);
    return router;
};
exports.default = userRoute;
