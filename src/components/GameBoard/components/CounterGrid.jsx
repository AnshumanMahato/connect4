import PropTypes from 'prop-types';
import Counter from './Counter';
import { useSelector } from 'react-redux';

function CounterGrid() {
  const cols = [1, 2, 3, 4, 5, 6, 7];
  const rows = [1, 2, 3, 4, 5, 6];

  const { grid } = useSelector((state) => state.game);

  return (
    <div className="gameboard__grid">
      {cols.map((col) => (
        <div key={col} className="gameboard__grid__col">
          {rows.map((row) => (
            <Counter
              key={`${row}-${col}`}
              counterState={grid[row][col]}
              className={`cell-${row}-${col}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

CounterGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default CounterGrid;
