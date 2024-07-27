import crypto from "crypto";
import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import Difficulty from "./@types/Difficulty.js";
import PvpGame from "./models/PvpGame.js";
import CpuGame from "./models/CpuGame.js";
import { startNewGame } from "./controllers/gameFactory.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {},
});

const playerRooms = new Map<string, string>();
const games = new Map<string, PvpGame | CpuGame>();
const messages = new Set<string>();

const isNewMessage = (msgOffset: string) => {
  if (messages.has(msgOffset)) return false;
  messages.add(msgOffset);
  return true;
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on(
    "join",
    async (
      msgOffset: string,
      payload: { mode?: string; difficulty?: Difficulty },
      callback
    ) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const player = uuidv4();
      const room = crypto.randomBytes(3).toString("hex").toUpperCase();
      const { mode, difficulty } = payload || {};
      if (!mode)
        return callback({
          status: "error",
          message: "mode is required",
        });

      const newGame = startNewGame(mode, difficulty);
      playerRooms.set(player, room);
      games.set(room, newGame);
      await socket.join(room);
      console.log("user joined", player);
      //timer will start only if game is started at client side
      const [res] = await io.to(room).timeout(1000).emitWithAck("startGame", {
        player,
        game: newGame,
      });
      console.log("game started", player, res);

      if (res.status === "game_started") {
        await newGame.startTimer(io, room);
      }
      callback({
        status: "ok",
      });
    }
  );

  socket.on(
    "pauseRequest",
    async (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const room = playerRooms.get(player) || "";
      const game = games.get(room);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      game.stopTimer();
      console.log("game paused", player);
      await io.to(room).timeout(1000).emitWithAck("pauseGame");
      console.log(playerRooms, games);
      callback({ status: "ok" });
    }
  );

  socket.on(
    "continueRequest",
    async (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });
      console.log("continue requested", player);
      console.log(playerRooms, games);
      const room = playerRooms.get(player) || "";
      const game = games.get(room);
      console.log("room", room, "game", game);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      console.log("game continued", player);
      //timer will start only if game is started at client side
      const [res] = await io.to(room).timeout(1000).emitWithAck("continueGame");

      if (res.status === "game_started") {
        await game.startTimer(io, room);
      }

      callback({ status: "ok" });
    }
  );

  socket.on(
    "playAgainRequest",
    async (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const room = playerRooms.get(player) || "";
      const game = games.get(room);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      game.stopTimer();
      game.playAgain();
      console.log("new game started", player);
      const [res] = await io
        .to(room)
        .timeout(1000)
        .emitWithAck("startGame", { player, game });

      if (res.status === "game_started") {
        await game.startTimer(io, room);
      }

      callback({ status: "ok" });
    }
  );

  socket.on(
    "restartRequest",
    async (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const room = playerRooms.get(player) || "";
      const game = games.get(room);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      //TODO: Test this after win and draw conditions are implemented. we may need to update the map.
      game.stopTimer();
      game.restart();
      console.log("game restarted", player);
      const [res] = await io
        .to(room)
        .timeout(1000)
        .emitWithAck("startGame", { player, game });

      if (res.status === "game_started") {
        await game.startTimer(io, room);
      }
      callback({ status: "ok" });
    }
  );

  socket.on(
    "moveRequest",
    async (
      msgOffset: string,
      { player, col }: { player: string; col: number },
      callback
    ) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const room = playerRooms.get(player) || "";
      const game = games.get(room);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      game.stopTimer();
      await io.to(room).timeout(1000).emitWithAck("evaluatingMove");
      console.log("move requested", player, col);
      let res: { status: string };
      if (game.makeMove(col)) {
        //update the game state
        res = (
          await io.to(room).timeout(1000).emitWithAck("update", { game })
        )[0];
      } else {
        res = (await io.to(room).timeout(1000).emitWithAck("invalidMove"))[0];
      }

      if (res.status === "state_updated") {
        await game.switchPlayer(io, room);
      }
      //if game is not over, start the timer
      if (!game.currentWinner && !game.isDraw) {
        await game.startTimer(io, room);
      }

      callback({ status: "ok" });
    }
  );

  socket.on(
    "leave",
    async (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      console.log("user left", player);
      const room = playerRooms.get(player) || "";
      playerRooms.delete(player);
      games.delete(room);

      //for pvp, configure 2 events later
      await io.to(room).timeout(1000).emitWithAck("endGame");
      callback({ status: "ok" });
    }
  );

  socket.on("disconnect", (reason) => {
    console.log("user disconnected", reason);
  });
});

server.listen(3000, () => {
  console.log("server started now");
});
