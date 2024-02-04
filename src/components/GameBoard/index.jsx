import classNames from 'classnames';
import PropTypes from 'prop-types';
import ControlColumns from './components/ControlColums';
import CounterGrid from './components/CounterGrid';
import BoardBackLarge from '../../assets/images/board-layer-black-large.svg?react';
import BoardFrontLarge from '../../assets/images/board-layer-white-large.svg?react';
import Result from '../utils/Result';
import Timer from '../utils/Timer';
import useGameLogic from './hooks/useGameLogic';
import './style.scss';
import BoardBack from './components/BoardBack';
import BoardFront from './components/BoardFront';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const { grid, insertCounter } = useGameLogic();

  let winner = null;
  return (
    <div className={classes}>
      {/* <BoardBackLarge className="gameboard__back" /> */}
      <BoardBack />
      <CounterGrid grid={grid} />
      {/* <BoardFrontLarge className="gameboard__front" /> */}
      <BoardFront />
      <ControlColumns insertCounter={insertCounter} grid={grid} />
      {winner ? (
        <Result winner={winner} className="gameboard__status" />
      ) : (
        <Timer player="self" className="gameboard__status" />
      )}
    </div>
  );
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
