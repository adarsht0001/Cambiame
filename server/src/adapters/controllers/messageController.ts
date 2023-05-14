import { Request, Response } from "express";
import { ConversationRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/conversationRepository";
import { ConversationRepositoryInterface } from "../../application/repositories/conversationRepositoryInterface";
import { MessageRepositoryMongoDb } from "../../framework/database/mongoDb/repositories/messagRepository";
import { MessageRepositoryInterface } from "../../application/repositories/messageRepositoryInterface";

const messageController = (
  messageRepositoryImpl: MessageRepositoryMongoDb,
  messageDbrepository: MessageRepositoryInterface
) => {
  const messageRepo = messageDbrepository(messageRepositoryImpl());

  const createMessage = async (req: Request, res: Response) => {
    messageRepo.addMessage(req.body);
  };

  const getMessage = async (req: Request, res: Response) => {
    const msg = await messageRepo.getMessage(req.params.conversationId);
    if (msg) {
      res.json(msg);
    } else {
      res.json({ msg: "No message found" });
    }
  };

  return {
    createMessage,
    getMessage,
  };
};

export default messageController;
