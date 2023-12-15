import { useCallback, useEffect, useRef, useState } from 'react';

function useGameLogic() {
  const [grid, setGrid] = useState([
    [0, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const recentEntry = useRef(null);

  useEffect(() => {
    if (!recentEntry.current) return;
    console.log('hello');

    let chain_start = recentEntry.current;
    let chain_end = recentEntry.current;
    let [row, col] = recentEntry.current;

    //Check horizontal chain
    while (col > 1) {
      if (grid[row][col] === grid[row][col - 1]) {
        chain_start = [row, col - 1];
        col--;
      } else break;
    }
    col = recentEntry.current[1];
    while (col < 7) {
      if (grid[row][col] === grid[row][col + 1]) {
        chain_end = [row, col + 1];
        col++;
      } else break;
    }

    if (Math.abs(chain_end[1] - chain_start[1]) >= 4) {
      return console.log('horizontal chain');
    }

    //Check Left Diagonal chain
    chain_start = chain_end = recentEntry.current;
    [row, col] = recentEntry.current;

    while (row > 1 && col > 1) {
      if (grid[row][col] === grid[row - 1][col - 1]) {
        chain_start = [row - 1, col - 1];
        row--;
        col--;
      } else break;
    }

    [row, col] = recentEntry.current;

    while (row < 6 && col < 7) {
      if (grid[row][col] === grid[row + 1][col + 1]) {
        chain_end = [row + 1, col + 1];
        row++;
        col++;
      } else break;
    }

    if (Math.abs(chain_end[1] - chain_start[1]) >= 4) {
      return console.log('left diagonal chain');
    }

    //Check Right Diagonal chain
    chain_start = chain_end = recentEntry.current;
    [row, col] = recentEntry.current;

    while (row < 6 && col > 1) {
      if (grid[row][col] === grid[row + 1][col - 1]) {
        chain_start = [row + 1, col - 1];
        row++;
        col--;
      } else break;
    }

    [row, col] = recentEntry.current;

    while (row > 1 && col < 7) {
      if (grid[row][col] === grid[row - 1][col + 1]) {
        chain_end = [row - 1, col + 1];
        row--;
        col++;
      } else break;
    }

    if (Math.abs(chain_end[1] - chain_start[1]) >= 4) {
      return console.log('right diagonal chain');
    }

    //Check vertical chain
    chain_start = chain_end = recentEntry.current;
    [row, col] = recentEntry.current;

    while (row < 6) {
      if (grid[row][col] === grid[row + 1][col]) {
        chain_end = [row + 1, col];
        row++;
      } else break;
    }

    if (Math.abs(chain_end[0] - chain_start[0]) >= 4) {
      return console.log('vertical chain');
    }
  }, [grid]);

  const insertCounter = useCallback((col, player) => {
    //Check if the column number is valid
    if (col < 1 || col > 7) throw new Error('Invalid column number');

    //Check if the player number is valid
    let value;
    switch (player) {
      case 1:
        value = 1;
        break;
      case 2:
        value = 2;
        break;
      default:
        throw new Error('Invalid player number');
    }

    setGrid((currGrid) => {
      //Check if there is any empty row in the column
      const row = currGrid[0][col];
      if (!row) return currGrid;

      //Deep Clone grid
      const newGrid = currGrid.map((row) => [...row]);
      //Insert counter
      newGrid[row][col] = value;

      //Update empty row
      newGrid[0][col]--;

      //Update recent entry
      recentEntry.current = [row, col];

      return newGrid;
    });
  }, []);

  return [grid, insertCounter];
}

export default useGameLogic;
