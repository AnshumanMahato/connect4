import anime from 'animejs';
import { useDispatch, useSelector } from 'react-redux';
import MarkerRed from '../../../assets/images/marker-red.svg?react';
import MarkerYellow from '../../../assets/images/marker-yellow.svg?react';
import { useCallback } from 'react';
import { insertCounter } from '../../../store';

function ControlColumns() {
  const cols = [1, 2, 3, 4, 5, 6, 7];

  const dispatch = useDispatch();
  const { currentPlayer, grid } = useSelector((state) => state.game);

  let player;
  switch (currentPlayer) {
    case 'player1':
    case 'self':
      player = 1;
      break;
    case 'player2':
    case 'cpu':
      player = 2;
      break;
  }

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
    (col) => {
      anime({
        targets: `.marker-${player}-${col}`,
        opacity: [0, 1],
        duration: 50,
      }).play();
    },
    [player]
  );

  const handleMousLeave = useCallback((col) => {
    anime({
      targets: [`.marker-1-${col}`, `.marker-2-${col}`],
      opacity: [1, 0],
      duration: 50,
    }).play();
  }, []);

  return (
    <div className="gameboard__controls">
      <div className="gameboard__marker">
        {cols.map((col) => (
          <div key={col} className="gameboard__marker__col">
            {player === 1 && <MarkerRed className={`marker marker-1-${col}`} />}
            {player === 2 && (
              <MarkerYellow className={`marker marker-2-${col}`} />
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
