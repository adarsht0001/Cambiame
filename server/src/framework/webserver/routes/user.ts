import express from "express";
import userController from "../../../adapters/controllers/userController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";
import multer from "multer";
import { s3Service } from "../../services/s3Service";
import { s3ServiceInterface } from "../../../application/services/s3serviceInterface";
import authenticateToken from "../middleware/jwtMiddleware";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const userRoute = () => {
  const router = express.Router();

  const controller = userController(
    userRepositoryMongoDB,
    userRepository,
    postRepositoryMongoDB,
    postRepository,
    s3Service,
    s3ServiceInterface
  );

  router.get("/profile/:name", authenticateToken, controller.getProfile);
  router.get("/search", authenticateToken, controller.searchUsername);
  router.get(
    "/search-user/:name/:user",
    authenticateToken,
    controller.searchResult
  );
  router.put("/follow/:name", authenticateToken, controller.follow);
  router.get("/user/:id", authenticateToken, controller.getUser);
  router.post(
    "/edit-profile",
    authenticateToken,
    upload.any(),
    controller.editProfile
  );
  return router;
};

export default userRoute;
