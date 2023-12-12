import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo } from 'react';

function CounterComponent({ counterState }) {
  const classes = classNames('gameboard__grid__cell', {
    'gameboard__grid__cell--red': counterState === 1,
    'gameboard__grid__cell--yellow': counterState === 2,
  });

  return <div className={classes}></div>;
}

CounterComponent.propTypes = {
  counterState: PropTypes.number,
};

//memoizing to prevent unnecessary re-renders
const Counter = memo(CounterComponent);

export default Counter;
