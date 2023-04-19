import express from "express";
import postController from "../../../adapters/controllers/postController";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";
import { s3ServiceInterface } from "../../../application/services/s3serviceInterface";
import { s3Service } from "../../services/s3Service";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PostRoute = () => {
  const router = express.Router();

  const controller = postController(
    postRepositoryMongoDB,
    postRepository,
    s3Service,
    s3ServiceInterface
  );
  router.get("/", controller.getPost);
  router.post("/", upload.single("file"), controller.createPost);
  router.delete("/delete-post/:id", controller.deletePost);
  return router;
};

export default PostRoute;
