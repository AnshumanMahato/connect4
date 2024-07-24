import { Socket } from "socket.io";
import GameMode from "../@types/GameMode.js";

const P1 = 1;
const P2 = 2;
const winP1 = 1111;
const winP2 = 2222;

abstract class Game {
  abstract mode: GameMode;
  abstract player1: string;
  abstract player2: string;
  abstract currentPlayer: string;
  #timer: NodeJS.Timeout | null;
  time: number;
  scoreP1: number;
  scoreP2: number;
  isDraw: boolean;
  currentWinner: string | null;
  recentEntry: number | null;
  grid: number[][];

  constructor() {
    this.#timer = null;
    this.time = 30;
    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.isDraw = false;
    this.currentWinner = null;
    this.recentEntry = null;
    this.grid = [
      [0, 6, 6, 6, 6, 6, 6, 6],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  #switchPlayer(socket: Socket) {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    this.time = 30;
    socket.emit("switchPlayer", {
      currentPlayer: this.currentPlayer,
      time: this.time,
    });
  }

  startTimer(socket: Socket) {
    this.#timer = setInterval(() => {
      this.time--;
      if (this.time < 0) {
        this.#switchPlayer(socket);
      } else {
        socket.emit("timer", { time: this.time });
      }
    }, 1000);
  }

  stopTimer() {
    if (this.#timer) {
      clearInterval(this.#timer);
      this.#timer = null;
    }
  }

  restart() {
    this.#timer = null;
    this.time = 30;
    this.currentWinner = null;
    this.recentEntry = null;
    this.isDraw = false;
    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.grid = [
      [0, 6, 6, 6, 6, 6, 6, 6],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }
}

export default Game;
