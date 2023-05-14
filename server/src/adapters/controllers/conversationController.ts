import { Request, Response } from "express";
import { ConversationRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/conversationRepository";
import { ConversationRepositoryInterface } from "../../application/repositories/conversationRepositoryInterface";

const conversationController = (
  conversationRepositoryImpl: ConversationRepositoryMongoDB,
  conversationDbrepository: ConversationRepositoryInterface
) => {
  const conversationRepo = conversationDbrepository(
    conversationRepositoryImpl()
  );

  const createConversation = async (req: Request, res: Response) => {
    conversationRepo.createConversation(req.body.senderId, req.body.receiverId);
  };

  const getConversation = async (req: Request, res: Response) => {
    const data = await conversationRepo.getConversation(req.params.userId);
    res.json(data);
  };
  return {
    createConversation,
    getConversation,
  };
};

export default conversationController;
