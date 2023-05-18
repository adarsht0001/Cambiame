import http from "http";
import express, { Application, NextFunction } from "express";
import serverConfig from "./framework/webserver/server";
import connectDB from "./framework/database/mongoDb/connection";
import expressConfig from "./framework/webserver/express";
import router from "./framework/webserver/routes";
import errorHandlingMidlleware from "./framework/webserver/middleware/errorHandlingMiddleware";
import AppError from "./utils/appErrors";
import { Server } from "socket.io";

const app: Application = express();

expressConfig(app);
const server = http.createServer(app);

connectDB();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users: any = [];

const addUser = (userId: any, socketId: any) => {
  !users.some((user: any) => user?.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: any) => {
  users = users.filter((user: any) => user.socketId !== socketId);
};

const getUser = (userId: any) => {
  return users.find((user: any) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("user disconneted");
    removeUser(socket.id);
  });

  socket.on("adduser", (userid) => {
    addUser(userid, socket.id);
    // io.emit("getuser", users);
    console.log(users);
  });

  socket.on("sendMessage", ({ senderid, receiverid, text, user }) => {
    const receiver = getUser(receiverid);
    console.log(receiverid);
    console.log(user);

    if (receiver) {
      console.log("here");
      io.to(receiver?.socketId).emit("getMessage", {
        senderid,
        text,
      });
      io.to(receiver?.socketId).emit("sentNotification", {
        senderid,
        text,
        user,
      });
    }
  });
});

router(app);
app.use(errorHandlingMidlleware);

// catch 404 and forward to error handler
app.all("*", (req, res, next: NextFunction) => {
  next(new AppError("Not found", 404));
});

serverConfig(server).startServer();
