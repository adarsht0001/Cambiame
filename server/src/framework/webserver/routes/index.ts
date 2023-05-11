import { Application } from "express";
import authRoute from "./auth";
import AdminRoute from "./admin";
import PostRoute from "./post";
import userRoute from "./user";
import conversationRoute from "./conversation";
import messageRoute from "./message";

const router = (app: Application) => {
  app.use("/", authRoute(), userRoute());
  app.use("/admin", AdminRoute());
  app.use("/post", PostRoute());
  app.use("/conversation", conversationRoute());
  app.use("/message", messageRoute());
};

export default router;
