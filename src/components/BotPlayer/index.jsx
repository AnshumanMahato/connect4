import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bot from './Bot';
import { insertCounter } from '../../store';
import easeOutBounce from '../../utils/easeOutBounce';

function BotPlayer({ animate }) {
  const dispatch = useDispatch();
  const { isEvaluating, currentPlayer, grid, currentWinner, isDraw } =
    useSelector((state) => state.game);

  const timeout = useRef(null);

  useEffect(() => {
    if (currentPlayer === 'cpu' && !isEvaluating && !currentWinner && !isDraw) {
      timeout.current = setTimeout(() => {
        const [row, col] = bot.pickBestMove(grid);
        dispatch(insertCounter({ col }));
        animate(
          `.cell-${row}-${col}`,
          { translateY: [`-${row * 130}%`, '0%'] },
          { duration: 1, ease: easeOutBounce }
        );
      }, 5000);

      return () => clearTimeout(timeout.current);
    }
  }, [
    currentPlayer,
    currentWinner,
    isEvaluating,
    isDraw,
    grid,
    dispatch,
    animate,
  ]);

  return null;
}

BotPlayer.propTypes = {
  animate: PropTypes.func.isRequired,
};

export default BotPlayer;
