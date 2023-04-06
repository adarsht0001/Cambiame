import express from "express";
import expressAsyncHandler from "express-async-handler";
import Admin from "../../database/mongoDb/models/userModels";
import authController from "../../../adapters/controllers/authController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import { authService } from "../../services/authServices";
import { authServiceInterface } from "../../../application/services/authServiceInterface";

const UserRoute = () => {
  const router = express.Router();
  console.log("ahfsh");

  const controller = authController(
    userRepositoryMongoDB,
    userRepository,
    authService,
    authServiceInterface
  );
  router.post("/login", controller.login);
  return router;
};

export default UserRoute;
