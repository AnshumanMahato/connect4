import Difficulty from "../@types/Difficulty.js";
import GameMode from "../@types/GameMode.js";
import Game from "./Game.js";

class CpuGame extends Game {
  mode: GameMode;
  difficulty: Difficulty;
  player1: string;
  player2: string;
  currentPlayer: string;
  constructor(difficulty: Difficulty = 1) {
    super();
    this.mode = GameMode.PVE;
    this.difficulty = difficulty;
    this.player1 = "self";
    this.player2 = "cpu";
    this.currentPlayer = "self";
  }
}

export default CpuGame;
