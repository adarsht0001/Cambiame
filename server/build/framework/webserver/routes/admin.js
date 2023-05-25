"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../../adapters/controllers/adminController"));
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const userRepositoryInterface_1 = require("../../../application/repositories/userRepositoryInterface");
const postRepository_1 = require("../../database/mongoDb/repositories/postRepository");
const postRepositoryInterface_1 = require("../../../application/repositories/postRepositoryInterface");
const authServices_1 = require("../../services/authServices");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const s3Service_1 = require("../../services/s3Service");
const s3serviceInterface_1 = require("../../../application/services/s3serviceInterface");
const AdminRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, adminController_1.default)(userRepository_1.userRepositoryMongoDB, userRepositoryInterface_1.userRepository, postRepository_1.postRepositoryMongoDB, postRepositoryInterface_1.postRepository, authServices_1.authService, authServiceInterface_1.authServiceInterface, s3Service_1.s3Service, s3serviceInterface_1.s3ServiceInterface);
    router.post("/login", controller.login);
    router.get("/users", controller.getAllUsers);
    router.put("/block-user", controller.blockUser);
    router.get("/user-dashboard", controller.getDashboard);
    router.get("/reported-post", controller.getReportedPost);
    router.get("/post/:id", controller.getSinglepost);
    router.get("/chart", controller.userChart);
    router.get("/postchart", controller.postChart);
    return router;
};
exports.default = AdminRoute;
