const GameManager = require("./GameManager");

const io = require("socket.io")(3006, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const Manager = new GameManager();

let matchTimer;

io.on("connection", (socket) => {
  console.log("client connect - ", socket.id);

  socket.on("reconnect", () => {
    console.log("client reconnect - ", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("client disconnect - ", socket.id);
    Manager.playerLeave(socket.id);
  });

  socket.on("join", () => {
    console.log("join received - ", socket.id);

    const playerStatus = Manager.playerJoin(socket.id);

    if (!playerStatus) return socket.emit("room-full");

    socket.emit("joined", playerStatus);

    if (Manager.players.length === 2) return io.emit("match-ready");
  });

  socket.on("ready", () => {
    console.log("ready received - ", socket.id);

    Manager.playerReady(socket.id);

    if (!(Manager.players[0]?.ready && Manager.players[1]?.ready)) return;

    console.log("Chrono started !");

    io.emit("start-chrono");

    const min = 2;
    const max = 6;

    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    console.log("Wait for " + rand + " seconds");
    matchTimer = setTimeout(() => {
      io.emit("chrono-end");
    }, rand * 1000);
  });

  socket.on("playerClick", () => {
    console.log(`player ${socket.id} click first`);
    io.emit("win", Manager.players.find(({ id }) => id === socket.id).name);
    Manager.resetReady();
  });

  socket.on("playerFailed", () => {
    clearTimeout(matchTimer);
    console.log(`player ${socket.id} click to early`);
    io.emit("win", Manager.players.find(({ id }) => id !== socket.id).name);
    Manager.resetReady();
  });
});
