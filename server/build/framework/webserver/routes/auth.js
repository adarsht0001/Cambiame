"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/controllers/authController"));
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const userRepositoryInterface_1 = require("../../../application/repositories/userRepositoryInterface");
const authServices_1 = require("../../services/authServices");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const mailServices_1 = require("../../services/mailServices");
const mailServicesInterface_1 = require("../../../application/services/mailServicesInterface");
const s3serviceInterface_1 = require("../../../application/services/s3serviceInterface");
const s3Service_1 = require("../../services/s3Service");
const authRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, authController_1.default)(userRepository_1.userRepositoryMongoDB, userRepositoryInterface_1.userRepository, authServices_1.authService, authServiceInterface_1.authServiceInterface, mailServices_1.mailService, mailServicesInterface_1.mailServiceInterface, s3Service_1.s3Service, s3serviceInterface_1.s3ServiceInterface);
    router.post("/login", controller.login);
    router.post("/signup", controller.signup);
    router.post("/forgot-password", controller.forgotPassword);
    router.post("/reset-password/:id/:token", controller.resetPassword);
    router.post("/verify-email/:id/:token", controller.verifyEmail);
    return router;
};
exports.default = authRoute;
