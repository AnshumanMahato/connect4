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

      const player = uuidv4();
      const { mode, difficulty } = payload || {};
      if (!mode)
        return callback({
          status: "error",
          message: "mode is required",
        });

      const newGame = startNewGame(mode, difficulty);
      games.set(player, newGame);

      console.log("user joined", player);
      //timer will start only if game is started at client side
      socket.emit(
        "startGame",
        { player, game: newGame },
        ({ status }: { status: string }) => {
          if (status === "game_started") {
            newGame.startTimer(socket);
          }
        }
      );
      callback({
        status: "ok",
      });
    }
  );

  socket.on(
    "pauseRequest",
    (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const game = games.get(player);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      game.stopTimer();
      console.log("game paused", player);
      socket.emit("pauseGame");
      callback({ status: "ok" });
    }
  );

  socket.on(
    "continueRequest",
    (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const game = games.get(player);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      console.log("game continued", player);
      //timer will start only if game is started at client side
      socket.emit("continueGame", ({ status }: { status: string }) => {
        console.log("status", status);
        if (status === "game_started") {
          game.startTimer(socket);
        }
      });
      callback({ status: "ok" });
    }
  );

  socket.on(
    "playAgainRequest",
    (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const game = games.get(player);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      game.stopTimer();
      game.playAgain();
      console.log("new game started", player);
      socket.emit(
        "startGame",
        { player, game },
        ({ status }: { status: string }) => {
          if (status === "game_started") {
            game.startTimer(socket);
          }
        }
      );
      callback({ status: "ok" });
    }
  );

  socket.on(
    "restartRequest",
    (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const game = games.get(player);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      //TODO: Test this after win and draw conditions are implemented. we may need to update the map.
      game.stopTimer();
      game.restart();
      console.log("game restarted", player);
      socket.emit(
        "startGame",
        { player, game },
        ({ status }: { status: string }) => {
          if (status === "game_started") {
            game.startTimer(socket);
          }
        }
      );
      callback({ status: "ok" });
    }
  );

  socket.on(
    "moveRequest",
    (
      msgOffset: string,
      { player, col }: { player: string; col: number },
      callback
    ) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      const game = games.get(player);
      if (!game)
        return callback({ status: "error", message: "game not found" });
      game.stopTimer();
      socket.emit("evaluatingMove");
      console.log("move requested", player, col);
      if (game.makeMove(col)) {
        //update the game state
        socket.emit("update", { game });
      } else {
        socket.emit("invalidMove");
      }
      game.switchPlayer(socket);
      //if game is not over, start the timer
      if (!game.currentWinner && !game.isDraw) {
        game.startTimer(socket);
      }

      callback({ status: "ok" });
    }
  );

  socket.on(
    "leave",
    (msgOffset: string, { player }: { player: string }, callback) => {
      // check if message is new
      if (!isNewMessage(msgOffset))
        return callback({ status: "notmodified", message: "already joined" });

      console.log("user left", player);
      games.delete(player);
      socket.emit("endGame");
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
