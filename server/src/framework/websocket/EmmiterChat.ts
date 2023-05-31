let users: any = [];

module.exports = {
  addUser: (userId: any, socketId: any) => {
    !users.some((user: any) => user?.userId === userId) &&
      users.push({ userId, socketId });
  },

  removeUser: (socketId: any) => {
    users = users.filter((user: any) => user.socketId !== socketId);
  },

  getUser: (userId: any) => {
    return users.find((user: any) => user.userId === userId);
  },
};
