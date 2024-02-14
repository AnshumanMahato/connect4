class Bot {
  #getAvailablePositions(tracker) {
    const availablePos = [];
    tracker.forEach((col, index) => {
      if (index) {
        if (col) availablePos.push(index);
      }
    });
    return availablePos;
  }

  pickBestMove(grid) {
    const availablePos = this.#getAvailablePositions(grid[0]);
    const index = Math.floor(Math.random() * availablePos.length);
    const col = availablePos[index];
    const row = grid[0][col];
    return [row, col];
  }
}

export default new Bot();
