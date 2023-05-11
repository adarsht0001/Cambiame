import { MessageRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/messagRepository";

export const messageRepository = (repository: MessageRepositoryDbReturn) => {
  const addMessage = async (data: any) => await repository.addMessage(data);
  const getConversation = async (userId: string) =>
    await repository.addMessage(userId);

  return {
    addMessage,
  };
};
export type MessageRepositoryInterface = typeof messageRepository;
