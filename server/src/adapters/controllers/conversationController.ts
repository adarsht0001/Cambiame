import { Request, Response } from "express";
import { ConversationRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/conversationRepository";
import { ConversationRepositoryInterface } from "../../application/repositories/conversationRepositoryInterface";
import { MessageRepositoryMongoDb } from "../../framework/database/mongoDb/repositories/messagRepository";
import { MessageRepositoryInterface } from "../../application/repositories/messageRepositoryInterface";

const conversationController = (
  conversationRepositoryImpl: ConversationRepositoryMongoDB,
  conversationDbrepository: ConversationRepositoryInterface,
  messageRepositoryImpl: MessageRepositoryMongoDb,
  messageDbrepository: MessageRepositoryInterface
) => {
  const conversationRepo = conversationDbrepository(
    conversationRepositoryImpl()
  );
  const messageRepo = messageDbrepository(messageRepositoryImpl());

  const createConversation = async (req: Request, res: Response) => {
    const Exist = await conversationRepo.getBothMembers(
      req.body.senderId,
      req.body.receiverId
    );
    if (Exist?.length > 0) {
      res.json(Exist[0]);
    } else {
      const data = await conversationRepo.createConversation(
        req.body.senderId,
        req.body.receiverId
      );
      res.json(data);
    }
  };

  const getConversation = async (req: Request, res: Response) => {
    const conversations: any = await conversationRepo.getConversation(
      req.params.userId
    );
    for (let conversation of conversations) {
      const message = await messageRepo.getLastMessage(
        conversation?._id as string
      );
      conversation.set("message", message, { strict: false });
    }
    res.json(conversations);
  };
  return {
    createConversation,
    getConversation,
  };
};

export default conversationController;
