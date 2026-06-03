const setupChatSocket = require("./chatSocket.js")
const authSocket = require("./authSocket.js")

const setUpSocket = (io) => {
  io.use(authSocket)
  io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

    setupChatSocket(io,socket)

    socket.on("disconnect", () => {
      console.log(`Same User Disconnect ${socket.id}`);
    });
  });
};


module.exports = setUpSocket