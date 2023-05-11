import Conversation from "../models/Conversation";

export const conversationRepositoryMongoDb = () => {
  const createConversation = async (senderId: string, receiverId: string) => {
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    return await newConversation.save();
  };

  const getConversation = async (userId: string) => {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    return conversation;
  };
  return {
    createConversation,
    getConversation,
  };
};

export type ConversationRepositoryMongoDB =
  typeof conversationRepositoryMongoDb;
export type ConversationRepositoryDbReturn =
  ReturnType<ConversationRepositoryMongoDB>;
