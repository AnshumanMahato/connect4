import { useCallback, useEffect, useRef, useState } from 'react';
import getChain from '../../../utils/getChain';
import markChain from '../../../utils/markChain';

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

    let chain = null;
    //Check horizontal chain
    chain = getChain(grid, recentEntry.current, 'h');

    //Check Left Diagonal chain
    if (!chain) chain = getChain(grid, recentEntry.current, 'ld');

    //Check Right Diagonal chain
    if (!chain) chain = getChain(grid, recentEntry.current, 'rd');

    //Check vertical chain
    if (!chain) chain = getChain(grid, recentEntry.current, 'v');

    //Check if there is a chain
    if (!chain) return;

    markChain(chain);
  }, [grid]);

  const resetGrid = useCallback(() => {
    recentEntry.current = null;
    setGrid([
      [0, 6, 6, 6, 6, 6, 6, 6],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  }, []);

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

  return { grid, insertCounter, resetGrid };
}

export default useGameLogic;
