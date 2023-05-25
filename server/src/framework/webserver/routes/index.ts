import { Application } from "express";
import authRoute from "./auth";
import AdminRoute from "./admin";
import PostRoute from "./post";
import userRoute from "./user";
import conversationRoute from "./conversation";
import messageRoute from "./message";

const router = (app: Application) => {
  app.use("/api/", authRoute(), userRoute());
  app.use("/api/admin", AdminRoute());
  app.use("/api/post", PostRoute());
  app.use("/api/conversation", conversationRoute());
  app.use("/api/message", messageRoute());
};

export default router;
