import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

function GameBoard({ className }) {
  const classes = classNames('game-board', className);

  return <div className={classes}>Gae</div>;
}

GameBoard.propTypes = {
  className: PropTypes.string,
};

export default GameBoard;
