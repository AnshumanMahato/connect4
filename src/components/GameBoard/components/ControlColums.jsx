import PropTypes from 'prop-types';

function ControlColumns({ insertCounter }) {
  const cols = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="gameboard__controls">
      {cols.map((col) => (
        <div
          key={col}
          className="gameboard__controls__col"
          onClick={() => {
            console.log('inserting counter in column', col);
            insertCounter(col, Math.random() > 0.5 ? 1 : 2);
          }}
        ></div>
      ))}
    </div>
  );
}

ControlColumns.propTypes = {
  insertCounter: PropTypes.func.isRequired,
};

export default ControlColumns;
