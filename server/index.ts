import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import Difficulty from "./@types/Difficulty.js";
import PvpGame from "./models/PvpGame.js";
import CpuGame from "./models/CpuGame.js";
import { startNewGame } from "./controllers/gameFactory.js";
import { log } from "console";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {},
});

const games = new Map<string, PvpGame | CpuGame>();
const messages = new Set<string>();

const isNewMessage = (msgOffset: string) => {
  if (messages.has(msgOffset)) return false;
  messages.add(msgOffset);
  return true;
};

io.on("connection", async (socket) => {
  console.log("a user connected");

  socket.on(
    "join",
    (
      msgOffset: string,
      payload: { mode?: string; difficulty?: Difficulty },
      callback
    ) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      console.log("user joined", socket.id);
      const player = uuidv4();
      const { mode, difficulty } = payload || {};
      if (!mode)
        return callback({
          status: "error",
          message: "mode is required",
        });

      const newGame = startNewGame(mode, difficulty);
      games.set(player, newGame);

      socket.emit("startGame", { player, game: newGame });
      callback({
        status: "ok",
      });
    }
  );

  socket.on(
    "pauseGame",
    (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      console.log("game paused", player);
      const game = games.get(player);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      // game.pause();
      callback({ status: "ok" });
    }
  );

  socket.on(
    "endGame",
    (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      console.log("game ended", player);
      games.delete(player);
      callback({ status: "ok" });
    }
  );

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server started now");
});
