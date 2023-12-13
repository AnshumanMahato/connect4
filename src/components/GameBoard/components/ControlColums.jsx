import PropTypes from 'prop-types';
import anime from 'animejs';
import MarkerRed from '../../../assets/images/marker-red.svg?react';
import MarkerYellow from '../../../assets/images/marker-yellow.svg?react';
import { useCallback } from 'react';

function ControlColumns({ grid, insertCounter }) {
  const cols = [1, 2, 3, 4, 5, 6, 7];

  const player = 1;

  const handleClick = useCallback(
    (col) => {
      const row = grid[0][col];
      insertCounter(col, Math.random() > 0.5 ? 1 : 2);
      anime({
        targets: `.cell-${row}-${col}`,
        translateY: [`-${row * 130}%`, '0%'],
        duration: 1000,
        easing: 'easeOutBounce',
      }).play();
    },
    [grid, insertCounter]
  );

  const handleMouseEnter = useCallback(
    (col) => {
      anime({
        targets: `.marker-${player}-${col}`,
        opacity: [0, 1],
      }).play();
    },
    [player]
  );

  const handleMousLeave = useCallback(
    (col) => {
      anime({
        targets: `.marker-${player}-${col}`,
        opacity: [1, 0],
      }).play();
    },
    [player]
  );

  return (
    <div className="gameboard__controls">
      <div className="gameboard__marker">
        {cols.map((col) => (
          <div key={col} className="gameboard__marker__col">
            <MarkerRed className={`marker marker-1-${col}`} />
            <MarkerYellow className={`marker marker-2-${col}`} />
          </div>
        ))}
      </div>
      {cols.map((col) => (
        <div
          key={col}
          className="gameboard__controls__col"
          onClick={() => handleClick(col)}
          onMouseEnter={() => handleMouseEnter(col)}
          onMouseLeave={() => handleMousLeave(col)}
        ></div>
      ))}
    </div>
  );
}

ControlColumns.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  insertCounter: PropTypes.func.isRequired,
};

export default ControlColumns;
