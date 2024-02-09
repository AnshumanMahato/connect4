import anime from 'animejs';
import { useAnimate } from 'framer-motion';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarkerRed from '../../../assets/images/marker-red.svg?react';
import MarkerYellow from '../../../assets/images/marker-yellow.svg?react';
import { insertCounter } from '../../../store';

function ControlColumns() {
  const cols = [1, 2, 3, 4, 5, 6, 7];

  const dispatch = useDispatch();
  const { currentPlayer: player, grid } = useSelector((state) => state.game);
  const [scope, animate] = useAnimate();

  const handleClick = useCallback(
    (col) => {
      const row = grid[0][col];
      dispatch(insertCounter({ col }));
      anime({
        targets: `.cell-${row}-${col}`,
        translateY: [`-${row * 130}%`, '0%'],
        duration: 1000,
        easing: 'easeOutBounce',
      }).play();
    },
    [grid, dispatch]
  );

  const handleMouseEnter = useCallback(
    (col) => animate(`.marker-${col}`, { opacity: 1 }, { duration: 0.05 }),
    [animate]
  );

  const handleMousLeave = useCallback(
    (col) => animate(`.marker-${col}`, { opacity: 0 }, { duration: 0.05 }),
    [animate]
  );

  return (
    <div className="gameboard__controls">
      <div ref={scope} className="gameboard__marker">
        {cols.map((col) => (
          <div key={col} className="gameboard__marker__col">
            {(player === 'player1' || player === 'self') && (
              <MarkerRed className={`marker marker-${col}`} />
            )}
            {(player === 'player2' || player === 'cpu') && (
              <MarkerYellow className={`marker marker-${col}`} />
            )}
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

export default ControlColumns;
