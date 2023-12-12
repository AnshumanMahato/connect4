import PropTypes from 'prop-types';
import Counter from './Counter';

function CounterGrid({ grid }) {
  const cols = [1, 2, 3, 4, 5, 6, 7];
  const rows = [1, 2, 3, 4, 5, 6];

  return (
    <div className="gameboard__grid">
      {cols.map((col) => (
        <div key={col} className="gameboard__grid__col">
          {rows.map((row) => (
            <Counter key={`${row}-${col}`} counterState={grid[row][col]} />
          ))}
        </div>
      ))}
    </div>
  );
}

CounterGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

export default CounterGrid;
