import express from "express";
import conversationController from "../../../adapters/controllers/conversationController";
import { conversationRepositoryMongoDb } from "../../database/mongoDb/repositories/conversationRepository";
import { conversationRepository } from "../../../application/repositories/conversationRepositoryInterface";
import { messageRepositoryMongoDb } from "../../database/mongoDb/repositories/messagRepository";
import { messageRepository } from "../../../application/repositories/messageRepositoryInterface";
import authenticateToken from "../middleware/jwtMiddleware";

const conversationRoute = () => {
  const router = express.Router();

  const controller = conversationController(
    conversationRepositoryMongoDb,
    conversationRepository,
    messageRepositoryMongoDb,
    messageRepository
  );

  router.post("/", authenticateToken, controller.createConversation);
  router.get("/:userId", authenticateToken, controller.getConversation);

  return router;
};

export default conversationRoute;
