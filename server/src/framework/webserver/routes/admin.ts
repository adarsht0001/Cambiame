import express from "express";
import adminController from "../../../adapters/controllers/adminController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";
import { authService } from "../../services/authServices";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { s3Service } from "../../services/s3Service";
import { s3ServiceInterface } from "../../../application/services/s3serviceInterface";
import authenticateToken from "../middleware/jwtMiddleware";

const AdminRoute = () => {
  const router = express.Router();

  const controller = adminController(
    userRepositoryMongoDB,
    userRepository,
    postRepositoryMongoDB,
    postRepository,
    authService,
    authServiceInterface,
    s3Service,
    s3ServiceInterface
  );

  router.post("/login", controller.login);
  router.get("/users", authenticateToken, controller.getAllUsers);
  router.put("/block-user", authenticateToken, controller.blockUser);
  router.get("/user-dashboard", authenticateToken, controller.getDashboard);
  router.get("/reported-post", controller.getReportedPost);
  router.get("/post/:id", controller.getSinglepost);
  router.get("/chart", authenticateToken, controller.userChart);
  router.get("/postchart", authenticateToken, controller.postChart);

  return router;
};
export default AdminRoute;
