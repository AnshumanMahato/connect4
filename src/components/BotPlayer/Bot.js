import { P1, P2 } from '../../store/constants/gameConstants';
import getChain from '../../utils/getChain';

class Bot {
  #getAvailablePositions(tracker) {
    /**
     * Get the available positions on the grid
     * @param {Array} tracker - The tracker array
     * @returns {Array} - The available positions
     */
    const availablePos = [];
    tracker.forEach((cell, index) => {
      if (cell > 0) availablePos.push(index);
    });
    return availablePos;
  }

  #isDraw(grid) {
    //Check if draw
    return grid[0].every((cell) => cell === 0);
  }

  #isWinningMove(grid, recentEntry) {
    /**
     * Check if the recent entry is the winning move
     * @param {Array} grid - The game grid
     * @param {Array} recentEntry - The last entry
     * @returns {Boolean} - True if the last entry is the winning move
     * @returns {Boolean} - False if the last entry is not the winning move
     */
    let chain = null;
    //Check horizontal chain
    chain = getChain(grid, recentEntry, 'h');
    //Check Left Diagonal chain
    if (!chain) chain = getChain(grid, recentEntry, 'ld');
    //Check Right Diagonal chain
    if (!chain) chain = getChain(grid, recentEntry, 'rd');
    //Check vertical chain
    if (!chain) chain = getChain(grid, recentEntry, 'v');
    //Check if there is a chain
    if (!chain) return false;

    return true;
  }

  #evaluateWindow(window) {
    let score = 0;

    const countPlayerPiece = window.filter((cell) => cell === P1).length;
    const countBotPiece = window.filter((cell) => cell === P2).length;
    const countEmpty = window.filter((cell) => cell === 0).length;

    //Check for 3 in a row for player
    if (countPlayerPiece === 3 && countEmpty === 1) score -= 1000;
    //Check for 2 in a row for player
    if (countPlayerPiece === 2 && countEmpty === 2) score -= 3;
    //Check for for 3 in a row for bot
    if (countBotPiece === 3 && countEmpty === 1) score += 10;
    //Check for 2 in a row for bot
    if (countBotPiece === 2 && countEmpty === 2) score += 5;

    return score;
  }

  #getScore(grid) {
    /**
     * Get the score of the grid. Find how good the grid is for the bot
     * @param {Array} grid - The game grid
     * @returns {Number} - The score of the grid
     */
    let score = 0;
    //Check horizontal
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 4; j++) {
        const window = grid[i].slice(j, j + 4);
        score += this.#evaluateWindow(window);
      }
    }
    //Check vertical
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 7; j++) {
        const window = [
          grid[i][j],
          grid[i + 1][j],
          grid[i + 2][j],
          grid[i + 3][j],
        ];
        score += this.#evaluateWindow(window);
      }
    }
    //Check left diagonal
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 4; j++) {
        const window = [
          grid[i][j],
          grid[i + 1][j + 1],
          grid[i + 2][j + 2],
          grid[i + 3][j + 3],
        ];
        score += this.#evaluateWindow(window);
      }
    }
    //Check right diagonal
    for (let i = 1; i <= 3; i++) {
      for (let j = 4; j <= 7; j++) {
        const window = [
          grid[i][j],
          grid[i + 1][j - 1],
          grid[i + 2][j - 2],
          grid[i + 3][j - 3],
        ];
        score += this.#evaluateWindow(window);
      }
    }

    return score;
  }

  play(grid) {
    //Get available positions
    const availablePos = this.#getAvailablePositions(grid[0]);
    let bestMove = [0, 0];
    let bestScore = -Infinity;
    //Loop through the available positions to find the best possible move
    availablePos.every((col) => {
      const row = grid[0][col];
      const recentEntry = [row, col];
      //Simulate the move
      const next = grid.map((row) => [...row]);
      next[row][col] = P2;
      next[0][col]--;

      let currentScore = 0;
      //Check if the move is the winning move
      if (this.#isWinningMove(next, recentEntry)) {
        bestMove = [row, col];
        console.log('winning move');
        //Return false to break the loop
        return false;
      }
      //Check if the move is a draw
      else if (this.#isDraw(next)) {
        console.log('draw move');
        currentScore = 0;
      }
      //Get the score of the move
      else {
        currentScore = this.#getScore(next);
        console.log('currentScore', currentScore);
      }

      if (currentScore > bestScore) {
        bestScore = currentScore;
        bestMove = [row, col];
      }
      return true;
    });

    return bestMove;
  }
}

export default new Bot();
