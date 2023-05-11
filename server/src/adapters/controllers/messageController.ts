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
    console.log(req.body);
    messageRepo.addMessage(req.body);
  };

  return {
    createMessage,
  };
};

export default messageController;
