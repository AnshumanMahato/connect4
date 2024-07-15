const getChain = (grid, recentEntry, direction) => {
  /**
   * Get the chain of a recent entry
   * @param {Array} grid - The game grid
   * @param {Array} recentEntry - The recent entry
   * @param {String} direction - The direction to check
   * @returns {Object} - The chain if there is a chain, null otherwise
   */
  let chainStart = recentEntry;
  let chainEnd = recentEntry;
  let [row, col] = recentEntry;
  let rowChange = 0,
    colChange = 0;
  let lowerbound, upperbound;

  //Direction to check
  switch (direction) {
    case 'h':
      colChange = 1;
      lowerbound = (row, col) => col > 1;
      upperbound = (row, col) => col < 7;
      break;
    case 'ld':
      rowChange = 1;
      colChange = 1;
      lowerbound = (row, col) => row > 1 && col > 1;
      upperbound = (row, col) => row < 6 && col < 7;
      break;
    case 'rd':
      rowChange = -1;
      colChange = 1;
      lowerbound = (row, col) => row < 6 && col > 1;
      upperbound = (row, col) => row > 1 && col < 7;
      break;
    case 'v':
      rowChange = 1;
      lowerbound = () => false;
      upperbound = (row) => row < 6;
      break;
    default:
      throw new Error('Invalid direction');
  }

  //get start of chain
  while (lowerbound(row, col)) {
    if (grid[row][col] === grid[row - rowChange][col - colChange]) {
      chainStart = [row - rowChange, col - colChange];
      row -= rowChange;
      col -= colChange;
    } else break;
  }

  //get end of chain
  [row, col] = recentEntry;
  while (upperbound(row, col)) {
    if (grid[row][col] === grid[row + rowChange][col + colChange]) {
      chainEnd = [row + rowChange, col + colChange];
      row += rowChange;
      col += colChange;
    } else break;
  }

  //get chain length
  const rowDiff = Math.abs(chainEnd[0] - chainStart[0]);
  const colDiff = Math.abs(chainEnd[1] - chainStart[1]);
  const chain_length = Math.max(rowDiff, colDiff) + 1;

  //return chain if length is greater than or equal to 4
  if (chain_length >= 4)
    return {
      chainStart,
      chainEnd,
      direction,
    };

  return null;
};

export default getChain;
