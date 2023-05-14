import { MessageRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/messagRepository";

export const messageRepository = (repository: MessageRepositoryDbReturn) => {
  const addMessage = async (data: any) => await repository.addMessage(data);

  const getMessage = async (id: string) => await repository.getMessages(id);

  return {
    addMessage,
    getMessage,
  };
};
export type MessageRepositoryInterface = typeof messageRepository;
