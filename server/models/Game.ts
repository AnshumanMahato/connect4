import { Socket } from "socket.io";
import BoundFunction from "../@types/BoundFunction.js";
import GameMode from "../@types/GameMode.js";
import Chain from "../@types/Chain.js";

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
  recentEntry: [number, number] | null;
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

  switchPlayer(socket: Socket) {
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
        this.switchPlayer(socket);
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

  makeMove(col: number) {
    //Check if there is a winner already
    if (this.currentWinner) return false;

    //Check if the column is full
    const row = this.grid[0][col];
    if (!row) return false;

    //Update the grid
    this.grid[row][col] = this.currentPlayer === this.player1 ? P1 : P2;
    this.grid[0][col]--;
    this.recentEntry = [row, col];

    //evaluate the grid
    this.#evaluate();
    return true;
  }

  #getChain(direction: string): Chain | null {
    /**
     * Get the chain of a recent entry
     * @param {String} direction - The direction to check
     * @returns {Object} - The chain if there is a chain, null otherwise
     */

    //Check if there is a recent entry
    if (!this.recentEntry) return null;

    let chainStart = this.recentEntry;
    let chainEnd = this.recentEntry;
    let [row, col] = this.recentEntry;
    let rowChange = 0,
      colChange = 0;
    let lowerbound: BoundFunction, upperbound: BoundFunction;

    //Direction to check
    switch (direction) {
      case "h":
        colChange = 1;
        lowerbound = (row, col) => col > 1;
        upperbound = (row, col) => col < 7;
        break;
      case "ld":
        rowChange = 1;
        colChange = 1;
        lowerbound = (row, col) => row > 1 && col > 1;
        upperbound = (row, col) => row < 6 && col < 7;
        break;
      case "rd":
        rowChange = -1;
        colChange = 1;
        lowerbound = (row, col) => row < 6 && col > 1;
        upperbound = (row, col) => row > 1 && col < 7;
        break;
      case "v":
        rowChange = 1;
        lowerbound = () => false;
        upperbound = (row) => row < 6;
        break;
      default:
        throw new Error("Invalid direction");
    }

    //get start of chain
    while (lowerbound(row, col)) {
      if (this.grid[row][col] === this.grid[row - rowChange][col - colChange]) {
        chainStart = [row - rowChange, col - colChange];
        row -= rowChange;
        col -= colChange;
      } else break;
    }

    //get end of chain
    [row, col] = this.recentEntry!;
    while (upperbound(row, col)) {
      if (this.grid[row][col] === this.grid[row + rowChange][col + colChange]) {
        chainEnd = [row + rowChange, col + colChange];
        row += rowChange;
        col += colChange;
      } else break;
    }

    //get chain length
    const rowDiff = Math.abs(chainEnd[0] - chainStart[0]);
    const colDiff = Math.abs(chainEnd[1] - chainStart[1]);
    const chain_length = Math.max(rowDiff, colDiff) + 1;

    //return chain if length is greater than or equal to 4
    if (chain_length >= 4)
      return {
        chainStart,
        chainEnd,
        direction,
      };

    return null;
  }

  #markChain(chain: Chain) {
    /**
     * Mark the chain in the grid
     * @param {Array} grid - The game grid
     * @param {Object} chain - The chain to mark
     * @returns {Array} - The grid with the chain marked
     */
    const {
      chainEnd: [rowEnd, colEnd],
      direction,
    } = chain;

    let rowChange = 0,
      colChange = 0,
      bound: BoundFunction;
    //Set parameters based on direction
    switch (direction) {
      case "h":
        colChange = 1;
        bound = (row, col) => col <= colEnd;
        break;
      case "ld":
        rowChange = 1;
        colChange = 1;
        bound = (row, col) => row <= rowEnd && col <= colEnd;
        break;
      case "rd":
        rowChange = -1;
        colChange = 1;
        bound = (row, col) => row >= rowEnd && col <= colEnd;
        break;
      case "v":
        rowChange = 1;
        bound = (row) => row <= rowEnd;
        break;
      default:
        throw new Error("Invalid direction");
    }

    //Initialize row and col
    let [row, col] = chain.chainStart;

    //Mark the chain
    while (bound(row, col)) {
      switch (this.grid[row][col]) {
        case 1:
          this.grid[row][col] = 1111;
          break;
        case 2:
          this.grid[row][col] = 2222;
          break;
        default:
          break;
      }
      row += rowChange;
      col += colChange;
    }
  }

  #evaluate() {
    const { grid, recentEntry } = this;

    let chain = null;
    //Check horizontal chain
    chain = this.#getChain("h");
    //Check Left Diagonal chain
    if (!chain) chain = this.#getChain("ld");
    //Check Right Diagonal chain
    if (!chain) chain = this.#getChain("rd");
    //Check vertical chain
    if (!chain) chain = this.#getChain("v");
    //Check if there is a chain
    if (!chain) {
      //Check if draw
      if (grid[0].every((cell) => cell === 0)) {
        this.isDraw = true;
      }
      return;
    }

    //If there is a chain, mark it and set the winner
    switch (this.currentPlayer) {
      case this.player1:
        this.currentWinner = this.player1;
        this.scoreP1++;
        break;
      case this.player2:
        this.currentWinner = this.player2;
        this.scoreP2++;
        break;
    }
    this.#markChain(chain);
  }
}

export default Game;
