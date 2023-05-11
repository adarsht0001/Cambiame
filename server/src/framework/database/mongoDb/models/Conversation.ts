import { Schema, model } from "mongoose";

const ConversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Conversation = model("Conversation", ConversationSchema);
export default Conversation;
