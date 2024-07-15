import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bot from './Bot';
import { insertCounter } from '../../store';
import easeOutBounce from '../../utils/easeOutBounce';
import { P1, P2 } from '../../store/constants/gameConstants';
import { PAUSE } from '../../store/constants/navConatansts';

function BotPlayer({ animate }) {
  const dispatch = useDispatch();
  const {
    difficulty,
    recentEntry,
    currentPlayer,
    grid,
    isEvaluating,
    currentWinner,
    isDraw,
  } = useSelector((state) => state.game);
  const { current: currentPage } = useSelector((state) => state.navigation);
  const bot = useMemo(() => new Bot(difficulty, P2, P1), [difficulty]);
  const timeout = useRef(null);

  useEffect(() => {
    if (
      currentPlayer === 'cpu' &&
      !isEvaluating &&
      !currentWinner &&
      !isDraw &&
      currentPage !== PAUSE
    ) {
      // Random delay to simulate thinking time for the bot (2-5 seconds)
      const duration = 2000 + parseInt(Math.random() * 3000, 10);
      timeout.current = setTimeout(() => {
        const [row, col] = bot.play(grid, recentEntry);
        dispatch(insertCounter({ col }));
        animate(
          `.cell-${row}-${col}`,
          { translateY: [`-${row * 130}%`, '0%'] },
          { duration: 1, ease: easeOutBounce }
        );
      }, duration);

      return () => clearTimeout(timeout.current);
    }
  }, [
    currentPage,
    currentPlayer,
    currentWinner,
    isEvaluating,
    isDraw,
    grid,
    recentEntry,
    bot,
    dispatch,
    animate,
  ]);

  return null;
}

BotPlayer.propTypes = {
  animate: PropTypes.func.isRequired,
};

export default BotPlayer;
