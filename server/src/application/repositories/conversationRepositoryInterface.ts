import { ConversationRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/conversationRepository";

export const conversationRepository = (
  repository: ConversationRepositoryDbReturn
) => {
  const createConversation = async (senderId: string, receiverId: string) =>
    await repository.createConversation(senderId, receiverId);

  const getConversation = async (userId: string) =>
    await repository.getConversation(userId);
  return {
    createConversation,
    getConversation,
  };
};
export type ConversationRepositoryInterface = typeof conversationRepository;
