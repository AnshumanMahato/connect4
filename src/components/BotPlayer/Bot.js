import getChain from '../../utils/getChain';

class Bot {
  constructor(difficulty, botPiece, playerPiece) {
    this.difficulty = difficulty;
    this.botPiece = botPiece;
    this.playerPiece = playerPiece;
  }
  #makeMove(grid, move, piece) {
    /**
     * Make a move on the grid
     * @param {Array} grid - The game grid
     * @param {Array} move - The move to make
     * @returns {Array} - The new grid after the move
     */
    const next = grid.map((row) => [...row]);
    const [row, col] = move;
    next[row][col] = piece;
    next[0][col]--;
    return next;
  }

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

    //count the number of pieces in the window
    const countPlayerPiece = window.filter(
      (cell) => cell === this.playerPiece
    ).length;
    const countBotPiece = window.filter(
      (cell) => cell === this.botPiece
    ).length;
    const countEmpty = window.filter((cell) => cell === 0).length;

    //Check for 3 in a row for player
    if (countPlayerPiece === 3 && countEmpty === 1) score -= 4;
    //Check for 2 in a row for player
    // if (countPlayerPiece === 2 && countEmpty === 2) score -= 3;
    //Check for for 3 in a row for bot
    if (countBotPiece === 3 && countEmpty === 1) score += 5;
    //Check for 2 in a row for bot
    if (countBotPiece === 2 && countEmpty === 2) score += 2;

    return score;
  }

  #getScore(grid) {
    /**
     * Get the score of the grid. Find how good the grid is for the bot
     * @param {Array} grid - The game grid
     * @returns {Number} - The score of the grid
     */
    let score = 0;

    //Check Center Column
    //adding more weight to the score for each piece in the center column
    //as it will be needed for both horizontal and diagonal chains
    const centerCount = grid
      .map((row) => row[4])
      .filter((cell) => cell === this.botPiece).length;
    score += centerCount * 3;

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

  #minimax(grid, recentEntry, depth, alpha, beta, isMaximizing) {
    /**
     * Minimax algorithm to find the best move
     * @param {Array} grid - The game grid
     * @param {Array} recentEntry - The recent entry
     * @param {Number} depth - The depth of the search
     * @param {Number} alpha - The alpha value for alpha-beta pruning
     * @param {Number} beta - The beta value for alpha-beta pruning
     * @param {Boolean} isMaximizing - True if the current player is the maximizer
     * @returns {Object} - The best move and the score
     */

    if (this.#isWinningMove(grid, recentEntry)) {
      //If current player is the maximizer then the previous move was from the minimizing player and vice versa
      return { move: null, score: isMaximizing ? -Infinity : Infinity };
    } else if (this.#isDraw(grid)) {
      return { move: null, score: 0 };
    } else if (depth === 0) {
      return { move: null, score: this.#getScore(grid) };
    } else {
      //DFS until the depth is 0 or a terminal state is reached
      const availablePos = this.#getAvailablePositions(grid[0]);
      let bestMove = [0, 0];
      if (isMaximizing) {
        //get next move with maximum score
        let maxScore = -Infinity;
        for (let i = 0; i < availablePos.length; i++) {
          const col = availablePos[i];
          const row = grid[0][col];
          const move = [row, col];
          const next = this.#makeMove(grid, move, this.botPiece);
          const { score } = this.#minimax(
            next,
            move,
            depth - 1,
            alpha,
            beta,
            false
          );
          if (score > maxScore) {
            maxScore = score;
            bestMove = move;
          }

          // alpha-beta pruning
          alpha = Math.max(alpha, score);
          if (beta <= alpha) break;
        }
        return { move: bestMove, score: maxScore };
      } else {
        //get next move with minimum score
        let minScore = Infinity;
        for (let i = 0; i < availablePos.length; i++) {
          const col = availablePos[i];
          const row = grid[0][col];
          const move = [row, col];
          const next = this.#makeMove(grid, move, this.playerPiece);
          const { score } = this.#minimax(
            next,
            move,
            depth - 1,
            alpha,
            beta,
            true
          );
          if (score < minScore) {
            minScore = score;
            bestMove = move;
          }

          //alpha-beta pruning
          beta = Math.min(beta, score);
          if (beta <= alpha) break;
        }
        return { move: bestMove, score: minScore };
      }
    }
  }

  play(grid, recentEntry) {
    /**
     * Get the best move for the bot
     * @param {Array} grid - The game grid
     * @param {Array} recentEntry - The recent entry
     * @returns {Array} - The best move for the bot
     */
    if (!recentEntry) return [grid[0][4], 4];

    const { move: bestMove, score } = this.#minimax(
      grid,
      recentEntry,
      this.difficulty,
      -Infinity,
      Infinity,
      true
    );
    if (score === -Infinity) {
      const availablePos = this.#getAvailablePositions(grid[0]);
      return [grid[0][availablePos[0]], availablePos[0]];
    }

    return bestMove;
  }
}

export default Bot;
