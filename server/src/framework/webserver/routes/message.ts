import express from "express";
import { messageRepositoryMongoDb } from "../../database/mongoDb/repositories/messagRepository";
import { messageRepository } from "../../../application/repositories/messageRepositoryInterface";
import messageController from "../../../adapters/controllers/messageController";

const messageRoute = () => {
  const router = express.Router();

  const controller = messageController(
    messageRepositoryMongoDb,
    messageRepository
  );

  router.post("/", controller.createMessage);
  //   router.get("/:userId", controller.getConversation);

  return router;
};

export default messageRoute;
