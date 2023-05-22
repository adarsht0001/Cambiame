import express from "express";
import conversationController from "../../../adapters/controllers/conversationController";
import { conversationRepositoryMongoDb } from "../../database/mongoDb/repositories/conversationRepository";
import { conversationRepository } from "../../../application/repositories/conversationRepositoryInterface";
import { messageRepositoryMongoDb } from "../../database/mongoDb/repositories/messagRepository";
import { messageRepository } from "../../../application/repositories/messageRepositoryInterface";

const conversationRoute = () => {
  const router = express.Router();

  const controller = conversationController(
    conversationRepositoryMongoDb,
    conversationRepository,
    messageRepositoryMongoDb,
    messageRepository
  );

  router.post("/", controller.createConversation);
  router.get("/:userId", controller.getConversation);

  return router;
};

export default conversationRoute;
