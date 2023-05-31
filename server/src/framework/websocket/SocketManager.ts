const { addUser, getUser, removeUser } = require("./EmmiterChat");

module.exports = function (io: any) {
  io.on("connection", (socket: any) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log("user disconneted");
      removeUser(socket.id);
    });

    socket.on("adduser", (userid: any) => {
      addUser(userid, socket.id);
      // io.emit("getuser", users);
    });

    socket.on("blockUser", ({ user }: { user: string }) => {
      console.log("blocked");

      const receiver = getUser(user);
      if (receiver) {
        io.to(receiver?.socketId).emit("blocked");
      }
    });
    socket.on(
      "sendMessage",
      ({
        senderid,
        receiverid,
        text,
        user,
      }: {
        senderid: string;
        receiverid: string;
        text: string;
        user: string;
      }) => {
        const receiver = getUser(receiverid);

        if (receiver) {
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
      }
    );
  });
};
