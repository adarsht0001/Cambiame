import http from "http";
import express, { Application, NextFunction } from "express";
import serverConfig from "./framework/webserver/server";
import connectDB from "./framework/database/mongoDb/connection";
import expressConfig from "./framework/webserver/express";
import router from "./framework/webserver/routes";
import errorHandlingMidlleware from "./framework/webserver/middleware/errorHandlingMiddleware";
import AppError from "./utils/appErrors";

const app: Application = express();

expressConfig(app);
const server = http.createServer(app);

connectDB();

router(app);
app.use(errorHandlingMidlleware);

app.all("*", (req, res, next: NextFunction) => {
  next(new AppError("Not found", 404));
});
// catch 404 and forward to error handler

serverConfig(server).startServer();
