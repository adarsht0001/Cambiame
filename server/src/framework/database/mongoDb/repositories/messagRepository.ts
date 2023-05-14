import Message from "../models/Message";

export const messageRepositoryMongoDb = () => {
  const addMessage = async (data: any) => {
    const newMessage = new Message(data);
    return newMessage.save();
  };

  const getMessages = async (id: string) => {
    return await Message.find({
      conversationId: id,
    });
  };

  return {
    addMessage,
    getMessages,
  };
};

export type MessageRepositoryMongoDb = typeof messageRepositoryMongoDb;
export type MessageRepositoryDbReturn = ReturnType<MessageRepositoryMongoDb>;