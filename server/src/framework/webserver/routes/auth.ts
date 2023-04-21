import express from "express";
import authController from "../../../adapters/controllers/authController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import { authService } from "../../services/authServices";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { mailService } from "../../services/mailServices";
import { mailServiceInterface } from "../../../application/services/mailServicesInterface";

const authRoute = () => {
  const router = express.Router();

  const controller = authController(
    userRepositoryMongoDB,
    userRepository,
    authService,
    authServiceInterface,
    mailService,
    mailServiceInterface
  );
  router.post("/login", controller.login);
  router.post("/signup", controller.signup);
  router.post("/forgot-password", controller.forgotPassword);
  router.post("/reset-password/:id/:token", controller.resetPassword);
  router.post("/verify-email/:id/:token", controller.verifyEmail);
  router.get("/profile/:id");
  return router;
};

export default authRoute;
