import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { motion } from 'framer-motion';

function CounterComponent({ counterState, className }) {
  const classes = classNames(
    'gameboard__grid__cell',
    {
      'gameboard__grid__cell--red': counterState === 1 || counterState === 1111,
      'gameboard__grid__cell--yellow':
        counterState === 2 || counterState === 2222,
    },
    className
  );

  return (
    <div className={classes}>
      {(counterState === 1111 || counterState === 2222) && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2, delay: 0.5 }}
          className="winmark"
        ></motion.div>
      )}
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
