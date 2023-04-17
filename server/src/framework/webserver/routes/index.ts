import { Application } from "express";
import UserRoute from "./user";
import AdminRoute from "./admin";
import PostRoute from "./post";

const router = (app: Application) => {
  app.use("/", UserRoute());
  app.use("/admin", AdminRoute());
  app.use("/post", PostRoute());
};

export default router;
