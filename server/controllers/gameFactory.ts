import Difficulty from "../@types/Difficulty.js";
import GameMode from "../@types/GameMode.js";
import CpuGame from "../models/CpuGame.js";
import PvpGame from "../models/PvpGame.js";

export function startNewGame(mode: string, difficulty?: Difficulty) {
  switch (mode) {
    case GameMode.PVP:
      return new PvpGame();
    case GameMode.PVE:
      return new CpuGame(difficulty);
    default:
      throw new Error("Invalid game mode.");
  }
}
