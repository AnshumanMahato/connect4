import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo } from 'react';

function CounterComponent({ counterState, className }) {
  const classes = classNames(
    'gameboard__grid__cell',
    {
      'gameboard__grid__cell--red': counterState === 1,
      'gameboard__grid__cell--yellow': counterState === 2,
    },
    className
  );

  return (
    <div className={classes}>
      <div className="winmark"></div>
    </div>
  );
}

CounterComponent.propTypes = {
  counterState: PropTypes.number,
  className: PropTypes.string,
};

//memoizing to prevent unnecessary re-renders
const Counter = memo(CounterComponent);

export default Counter;
