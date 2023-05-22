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

  const getLastMessage = async (id: string) => {
    const LastMessage = await Message.findOne({ convesationId: id }).sort({
      createdAt: -1,
    });
    return LastMessage;
  };

  return {
    addMessage,
    getMessages,
    getLastMessage,
  };
};

export type MessageRepositoryMongoDb = typeof messageRepositoryMongoDb;
export type MessageRepositoryDbReturn = ReturnType<MessageRepositoryMongoDb>;
