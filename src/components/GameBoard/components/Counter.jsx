import classNames from 'classnames';
import PropTypes from 'prop-types';

function Counter({ counterState }) {
  const classes = classNames('gameboard__grid__cell', {
    'gameboard__grid__cell--red': counterState === 1,
    'gameboard__grid__cell--yellow': counterState === 2,
  });

  return <div className={classes}></div>;
}

Counter.propTypes = {
  counterState: PropTypes.number,
};

export default Counter;
