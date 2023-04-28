import express from "express";
import adminController from "../../../adapters/controllers/adminController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";
import { authService } from "../../services/authServices";
import { authServiceInterface } from "../../../application/services/authServiceInterface";

const AdminRoute = () => {
  const router = express.Router();

  const controller = adminController(
    userRepositoryMongoDB,
    userRepository,
    postRepositoryMongoDB,
    postRepository,
    authService,
    authServiceInterface
  );

  router.post("/login", controller.login);
  router.get("/users", controller.getAllUsers);
  router.put("/block-user", controller.blockUser);
  router.get("/user-dashboard", controller.getDashboard);

  return router;
};
export default AdminRoute;
