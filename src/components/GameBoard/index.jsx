import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardBack from './components/BoardBack';
import BoardFront from './components/BoardFront';
import ControlColumns from './components/ControlColums';
import CounterGrid from './components/CounterGrid';
import Result from '../utils/Result';
import Timer from '../utils/Timer';
import { checkWinner, resetGame, switchPlayer } from '../../store';
import './style.scss';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const dispatch = useDispatch();
  const {
    currentPlayer: player,
    currentWinner,
    recentEntry,
  } = useSelector((state) => state.game);

  const handleTimeout = () => {
    dispatch(switchPlayer());
  };

  const handleReset = () => {
    dispatch(resetGame());
    console.log('Reset');
  };

  useEffect(() => {
    if (!recentEntry) return;

    dispatch(checkWinner());
  }, [recentEntry, dispatch]);

  return (
    <div className={classes}>
      <BoardBack />
      <CounterGrid />
      <BoardFront />
      <ControlColumns />
      {currentWinner ? (
        <Result
          winner={currentWinner}
          onReset={handleReset}
          className="gameboard__status"
        />
      ) : (
        <Timer
          player={player}
          duration={15}
          onTimeout={handleTimeout}
          className="gameboard__status"
        />
      )}
    </div>
  );
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
