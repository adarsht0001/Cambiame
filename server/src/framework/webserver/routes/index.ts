import { Application } from "express";
import authRoute from "./auth";
import AdminRoute from "./admin";
import PostRoute from "./post";
import userRoute from "./user";

const router = (app: Application) => {
  app.use("/", authRoute(), userRoute());
  app.use("/admin", AdminRoute());
  app.use("/post", PostRoute());
};

export default router;
