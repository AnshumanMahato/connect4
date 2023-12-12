import classNames from 'classnames';
import PropTypes from 'prop-types';
import CounterInterface from './components/CounterInterface';
import BoardBackLarge from '../../assets/images/board-layer-black-large.svg?react';
import BoardFrontLarge from '../../assets/images/board-layer-white-large.svg?react';
import './style.scss';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  return (
    <div className={classes}>
      <BoardBackLarge className="gameboard__back" />
      <CounterInterface />
      <BoardFrontLarge className="gameboard__front" />
    </div>
  );
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
