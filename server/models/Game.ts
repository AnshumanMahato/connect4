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
  scoreP1: number;
  scoreP2: number;
  isDraw: boolean;
  currentWinner: string | null;
  recentEntry: number | null;
  grid: number[][];

  constructor() {
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
}

export default Game;
