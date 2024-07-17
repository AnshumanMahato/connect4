import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = new Map<string, string>();

io.on("connection", async (socket) => {
  console.log("a user connected");

  socket.on("join", () => {
    console.log("user joined");
    const userId = uuidv4();
    users.set(userId, socket.id);
    socket.emit("userId", { userId });
  });

  socket.on("rejoin", (data) => {
    console.log("user rejoin");
    users.set(data.userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    users.forEach((value, key) => {
      if (value === socket.id) {
        users.delete(key);
      }
    });
  });
});

server.listen(3000, () => {
  console.log("server started now");
});
