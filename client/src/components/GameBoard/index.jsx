import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useAnimate } from 'framer-motion';
import BoardBack from './components/BoardBack';
import BoardFront from './components/BoardFront';
import ControlColumns from './components/ControlColums';
import CounterGrid from './components/CounterGrid';
import Result from './components/Result';
import Timer from './components/Timer';
import BotPlayer from '../BotPlayer';
import { useEffect } from 'react';
import easeOutBounce from '../../utils/easeOutBounce';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const {
    mode,
    recentEntry,
    currentPlayer,
    currentWinner,
    isEvaluating,
    isDraw,
  } = useSelector((state) => state.game);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (recentEntry) {
      const [row, col] = recentEntry;
      animate(
        `.cell-${row}-${col}`,
        { translateY: [`-${row * 130}%`, '0%'] },
        { duration: 1, ease: easeOutBounce }
      );
    }
  }, [recentEntry, animate]);

  return (
    <>
      {mode === 'pve' && <BotPlayer animate={animate} />}
      <div ref={scope} className={classes}>
        <BoardBack />
        <CounterGrid />
        <BoardFront />
        {currentPlayer !== 'cpu' && !isEvaluating && !currentWinner && (
          <ControlColumns animate={animate} />
        )}
        {currentWinner || isDraw ? (
          <Result
            isDraw={isDraw}
            winner={currentWinner}
            className="gameboard__result"
          />
        ) : (
          <Timer duration={30} className="gameboard__timer" />
        )}
      </div>
    </>
  );
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
