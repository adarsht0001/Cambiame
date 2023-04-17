import express from "express";
import postController from "../../../adapters/controllers/postController";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";

const PostRoute = () => {
  const router = express.Router();

  const controller = postController(postRepositoryMongoDB, postRepository);
  router.post("/");
  return router;
};

export default PostRoute;
