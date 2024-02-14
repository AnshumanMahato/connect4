import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardBack from './components/BoardBack';
import BoardFront from './components/BoardFront';
import ControlColumns from './components/ControlColums';
import CounterGrid from './components/CounterGrid';
import Result from './components/Result';
import Timer from './components/Timer';
import { checkWinner } from '../../store';
import './style.scss';
import { useAnimate } from 'framer-motion';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const dispatch = useDispatch();
  const { currentPlayer, currentWinner, recentEntry, isDraw } = useSelector(
    (state) => state.game
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!recentEntry) return;

    dispatch(checkWinner());
  }, [recentEntry, dispatch]);

  return (
    <div ref={scope} className={classes}>
      <BoardBack />
      <CounterGrid />
      <BoardFront />
      {currentPlayer !== 'cpu' && <ControlColumns animate={animate} />}
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
  );
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
