
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.json({
    game: "VORTEX ROYALE",
    status: "ONLINE",
    maxPlayers: 60,
    maps: 3
  });
});

io.on("connection", (socket) => {
  console.log("Jogador conectado:", socket.id);

  socket.on("join_match", (data) => {
    socket.join("vortex-lobby");
    socket.emit("joined_match", {
      message: "Bem-vindo ao VORTEX ROYALE!"
    });
  });

  socket.on("disconnect", () => {
    console.log("Jogador desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`VORTEX ROYALE ONLINE na porta ${PORT}`);
});
