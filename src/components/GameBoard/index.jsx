import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BoardBack from './components/BoardBack';
import BoardFront from './components/BoardFront';
import ControlColumns from './components/ControlColums';
import CounterGrid from './components/CounterGrid';
import Result from '../utils/Result';
import Timer from '../utils/Timer';
import { resetGame, setWinner, switchPlayer } from '../../store';
import './style.scss';
import { useEffect } from 'react';
import getChain from './utils/getChain';
import markChain from './utils/markChain';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const dispatch = useDispatch();
  const {
    currentPlayer: player,
    currentWinner,
    grid,
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

    let chain = null;
    //Check horizontal chain
    chain = getChain(grid, recentEntry, 'h');

    //Check Left Diagonal chain
    if (!chain) chain = getChain(grid, recentEntry, 'ld');

    //Check Right Diagonal chain
    if (!chain) chain = getChain(grid, recentEntry, 'rd');

    //Check vertical chain
    if (!chain) chain = getChain(grid, recentEntry, 'v');

    //Check if there is a chain
    if (!chain) return;

    markChain(chain);
    dispatch(setWinner());
  }, [grid, recentEntry, dispatch]);

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
