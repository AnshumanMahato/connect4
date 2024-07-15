const getBounds = (direction, rowEnd, colEnd) => {
  let rowChange = 0,
    colChange = 0,
    bound;
  //SET PARAMETERS AS PER DIRECTION
  switch (direction) {
    case 'h':
      colChange = 1;
      bound = (row, col) => col <= colEnd;
      break;
    case 'ld':
      rowChange = 1;
      colChange = 1;
      bound = (row, col) => row <= rowEnd && col <= colEnd;
      break;
    case 'rd':
      rowChange = -1;
      colChange = 1;
      bound = (row, col) => row >= rowEnd && col <= colEnd;
      break;
    case 'v':
      rowChange = 1;
      bound = (row) => row <= rowEnd;
      break;
    default:
      throw new Error('Invalid direction');
  }

  return { rowChange, colChange, bound };
};

const markChain = (grid, chain) => {
  /**
   * Mark the chain in the grid
   * @param {Array} grid - The game grid
   * @param {Object} chain - The chain to mark
   * @returns {Array} - The grid with the chain marked
   */
  const {
    chainEnd: [rowEnd, colEnd],
    direction,
  } = chain;

  const { rowChange, colChange, bound } = getBounds(direction, rowEnd, colEnd);

  //INITIALIZE TARGETS
  let [row, col] = chain.chainStart;
  //Deep Clone grid
  const newGrid = grid.map((row) => [...row]);
  while (bound(row, col)) {
    switch (newGrid[row][col]) {
      case 1:
        newGrid[row][col] = 1111;
        break;
      case 2:
        newGrid[row][col] = 2222;
        break;
      default:
        break;
    }
    row += rowChange;
    col += colChange;
  }

  return newGrid;
};

export default markChain;
