import express from "express";
import userController from "../../../adapters/controllers/userController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";
import multer from "multer";
import { s3Service } from "../../services/s3Service";
import { s3ServiceInterface } from "../../../application/services/s3serviceInterface";
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

  router.get("/profile/:name", controller.getProfile);
  router.get("/search", controller.searchUsername);
  router.get("/search-user/:name/:user", controller.searchResult);
  router.put("/follow/:name", controller.follow);
  router.get("/user/:id", controller.getUser);
  router.post("/edit-profile", upload.any(), controller.editProfile);
  return router;
};

export default userRoute;
