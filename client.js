const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3007 },
  async () => {
    console.log("Connected to server.");

    const ask = async () => {
      const message = await rl.question("Enter your message > ");
      // move one line up
      await moveCursor(0, -1);
      // clear the line
      await clearLine(0);
      socket.write(message);
    };

    ask();

    socket.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(data.toString("utf-8"));
      ask();
    });
  }
);

socket.on("end", () => {
  console.log("Connection was ended.");
});
