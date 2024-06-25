const net = require("net");

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("New connection to the server.");
});

server.listen(3007, "127.0.0.1", () => {
  console.log("Server running on:", server.address());
});
