"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./framework/webserver/server"));
const connection_1 = __importDefault(require("./framework/database/mongoDb/connection"));
const express_2 = __importDefault(require("./framework/webserver/express"));
const routes_1 = __importDefault(require("./framework/webserver/routes"));
const errorHandlingMiddleware_1 = __importDefault(require("./framework/webserver/middleware/errorHandlingMiddleware"));
const appErrors_1 = __importDefault(require("./utils/appErrors"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
(0, express_2.default)(app);
const server = http_1.default.createServer(app);
(0, connection_1.default)();
const io = new socket_io_1.Server(server, {
    path: "/api/socket.io/",
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://cambiame.site",
        methods: ["GET", "POST"],
    },
});
// require("../src/framework/websocket/SocketManager")(io);
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => (user === null || user === void 0 ? void 0 : user.userId) === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
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
    socket.on("blockUser", ({ user }) => {
        console.log("blocked");
        const receiver = getUser(user);
        if (receiver) {
            io.to(receiver === null || receiver === void 0 ? void 0 : receiver.socketId).emit("blocked");
        }
    });
    socket.on("sendMessage", ({ senderid, receiverid, text, user }) => {
        const receiver = getUser(receiverid);
        if (receiver) {
            io.to(receiver === null || receiver === void 0 ? void 0 : receiver.socketId).emit("getMessage", {
                senderid,
                text,
            });
            io.to(receiver === null || receiver === void 0 ? void 0 : receiver.socketId).emit("sentNotification", {
                senderid,
                text,
                user,
            });
        }
    });
});
(0, routes_1.default)(app);
// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
    next(new appErrors_1.default("Not found", 404));
});
app.use(errorHandlingMiddleware_1.default);
(0, server_1.default)(server).startServer();
