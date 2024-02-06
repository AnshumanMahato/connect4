import classNames from 'classnames';
import PropTypes from 'prop-types';
import BoardBack from './components/BoardBack';
import BoardFront from './components/BoardFront';
import ControlColumns from './components/ControlColums';
import CounterGrid from './components/CounterGrid';
import Result from '../utils/Result';
import Timer from '../utils/Timer';
import useGameLogic from './hooks/useGameLogic';
import './style.scss';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const { grid, insertCounter } = useGameLogic();

  let winner = null;
  return (
    <div className={classes}>
      <BoardBack />
      <CounterGrid grid={grid} />
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
