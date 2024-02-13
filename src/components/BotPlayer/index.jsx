import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bot from './Bot';
import { insertCounter } from '../../store';
import { easeOutBounce } from '../../utils/easeOutBounce';

function BotPlayer({ animate }) {
  const dispatch = useDispatch();
  const { currentPlayer, grid, currentWinner, isDraw } = useSelector(
    (state) => state.game
  );
  useEffect(() => {
    if (currentPlayer === 'cpu' && !currentWinner && !isDraw) {
      const [row, col] = bot.pickBestMove(grid);
      dispatch(insertCounter({ col }));
      animate(
        `.cell-${row}-${col}`,
        { translateY: [`-${row * 130}%`, '0%'] },
        { duration: 1, ease: easeOutBounce }
      );
    }
  }, [currentPlayer, currentWinner, isDraw, grid, dispatch, animate]);

  return <></>;
}

BotPlayer.propTypes = {
  animate: PropTypes.func.isRequired,
};

export default BotPlayer;
