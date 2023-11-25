import classNames from 'classnames';
import PropTypes from 'prop-types';
import BoardBackLarge from '../../assets/images/board-layer-black-large.svg?react';
import BoardFrontLarge from '../../assets/images/board-layer-white-large.svg?react';
import './style.scss';

function GameBoard({ className }) {
  const classes = classNames('gameboard', className);

  const grid = (
    <div className="gameboard__grid">
      {[0, 1, 2, 3, 4, 5, 6].map((col) => (
        <div className="gameboard__grid__col" key={col}>
          {[0, 1, 2, 3, 4, 5].map((cell) => (
            <div className="gameboard__grid__cell" key={cell}></div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={classes}>
      <BoardBackLarge className="gameboard__back" />
      {grid}
      <BoardFrontLarge className="gameboard__front" />
    </div>
  );
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
