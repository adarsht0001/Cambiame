import { ConversationRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/conversationRepository";

export const conversationRepository = (
  repository: ConversationRepositoryDbReturn
) => {
  const createConversation = async (senderId: string, receiverId: string) =>
    await repository.createConversation(senderId, receiverId);

  const getConversation = async (userId: string) =>
    await repository.getConversation(userId);

  const getSort = async (userId: string) => await repository.getSort(userId);

  const getBothMembers = async (senderId: string, receiverId: string) =>
    await repository.getBothMembers(senderId, receiverId);

  return {
    createConversation,
    getConversation,
    getBothMembers,
    getSort,
  };
};
export type ConversationRepositoryInterface = typeof conversationRepository;
