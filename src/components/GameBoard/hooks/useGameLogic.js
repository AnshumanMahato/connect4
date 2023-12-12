import { useCallback, useState } from 'react';

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

  const insertCounter = useCallback((col, player) => {
    //Check if the column number is valid
    if (col < 1 || col > 7) throw new Error('Invalid column number');
    console.log('inserting counter in column', col);
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

      return newGrid;
    });
  }, []);

  return [grid, insertCounter];
}

export default useGameLogic;
