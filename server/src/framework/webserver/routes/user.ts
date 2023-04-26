import express from "express";
import userController from "../../../adapters/controllers/userController";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";

const userRoute = () => {
  const router = express.Router();

  const controller = userController(
    userRepositoryMongoDB,
    userRepository,
    postRepositoryMongoDB,
    postRepository
  );

  router.get("/profile/:name", controller.getProfile);
  router.get("/search", controller.searchUsername);
  router.get("/search-user/:name/:user", controller.searchResult);
  router.put("/follow/:name");
  return router;
};

export default userRoute;
