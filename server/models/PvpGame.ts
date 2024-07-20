import GameMode from "../@types/GameMode.js";
import Game from "./Game.js";

class PvpGame extends Game {
  mode: GameMode;
  player1: string;
  player2: string;
  currentPlayer: string;
  constructor() {
    super();
    this.mode = GameMode.PVP;
    this.player1 = "player1";
    this.player2 = "player2";
    this.currentPlayer = "player1";
  }
}

export default PvpGame;
