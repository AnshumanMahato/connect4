import { useState } from 'react';

function useGameLogic() {
  const [grid, setGrid] = useState([
    [0, 6, 6, 5, 3, 5, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 1, 0, 0],
  ]);

  const setPosition = (row, col, value) => {
    setGrid((currGrid) => {
      const newGrid = [...currGrid];
      newGrid[row][col] = value;
      return newGrid;
    });
  };

  return [grid, setPosition];
}

export default useGameLogic;
