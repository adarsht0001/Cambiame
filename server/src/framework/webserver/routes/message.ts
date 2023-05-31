import express from "express";
import { messageRepositoryMongoDb } from "../../database/mongoDb/repositories/messagRepository";
import { messageRepository } from "../../../application/repositories/messageRepositoryInterface";
import messageController from "../../../adapters/controllers/messageController";
import authenticateToken from "../middleware/jwtMiddleware";

const messageRoute = () => {
  const router = express.Router();

  const controller = messageController(
    messageRepositoryMongoDb,
    messageRepository
  );

  router.post("/", authenticateToken, controller.createMessage);
  router.get("/:conversationId", authenticateToken, controller.getMessage);

  return router;
};

export default messageRoute;
