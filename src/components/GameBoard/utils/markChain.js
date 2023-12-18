import anime from 'animejs';

const markChain = (chain) => {
  const {
    chainEnd: [rowEnd, colEnd],
    direction,
  } = chain;
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

  //INITIALIZE TARGETS
  let [row, col] = chain.chainStart;
  let targets = [];
  while (bound(row, col)) {
    targets.push(`.cell-${row}-${col} .winmark`);
    row += rowChange;
    col += colChange;
  }

  //ADD ANIMATION
  anime({
    targets,
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(300, {
      start: 700,
      from: 'center',
    }),
  }).play();
};

export default markChain;
