import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAnimate } from 'framer-motion';
import BoardBack from './components/BoardBack';
import BoardFront from './components/BoardFront';
import ControlColumns from './components/ControlColums';
import CounterGrid from './components/CounterGrid';
import Result from './components/Result';
import Timer from './components/Timer';
import { checkWinner } from '../../store';
import './style.scss';
import BotPlayer from '../BotPlayer';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const dispatch = useDispatch();
  const {
    mode,
    currentPlayer,
    currentWinner,
    recentEntry,
    isEvaluating,
    isDraw,
  } = useSelector((state) => state.game);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!recentEntry) return;

    dispatch(checkWinner());
  }, [recentEntry, dispatch]);

  return (
    <>
      {mode === 'pve' && <BotPlayer animate={animate} />}
      <div ref={scope} className={classes}>
        <BoardBack />
        <CounterGrid />
        <BoardFront />
        {currentPlayer !== 'cpu' && !isEvaluating && (
          <ControlColumns animate={animate} />
        )}
        {currentWinner || isDraw ? (
          <Result
            isDraw={isDraw}
            winner={currentWinner}
            className="gameboard__result"
          />
        ) : (
          <Timer duration={15} className="gameboard__timer" />
        )}
      </div>
    </>
  );
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
