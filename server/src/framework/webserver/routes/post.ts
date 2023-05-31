import express from "express";
import postController from "../../../adapters/controllers/postController";
import { postRepositoryMongoDB } from "../../database/mongoDb/repositories/postRepository";
import { postRepository } from "../../../application/repositories/postRepositoryInterface";
import { s3ServiceInterface } from "../../../application/services/s3serviceInterface";
import { s3Service } from "../../services/s3Service";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { userRepository } from "../../../application/repositories/userRepositoryInterface";
import multer from "multer";
import authenticateToken from "../middleware/jwtMiddleware";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PostRoute = () => {
  const router = express.Router();

  const controller = postController(
    postRepositoryMongoDB,
    postRepository,
    userRepositoryMongoDB,
    userRepository,
    s3Service,
    s3ServiceInterface
  );

  router.get("/", authenticateToken, controller.getPost);
  router.post(
    "/",
    authenticateToken,
    upload.single("file"),
    controller.createPost
  );
  router.delete("/delete-post/:id", authenticateToken, controller.deletePost);
  router.put("/like/:id/:postId", authenticateToken, controller.likePost);
  router.put("/report/:id/:postId", authenticateToken, controller.reportPost);
  router.post("/add-comment", authenticateToken, controller.addComent);
  router.get("/get-post/:id", authenticateToken, controller.getSinglepost);
  router.get(
    "/get-comments/:postId",
    authenticateToken,
    controller.getAllcomments
  );

  return router;
};

export default PostRoute;
