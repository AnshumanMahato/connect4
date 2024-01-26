import classNames from 'classnames';
import PropTypes from 'prop-types';
import Panel from '../Panel';
import Button from '../Button';
import './style.scss';

function Result({ winner, className }) {
  const classes = classNames('result', className);
  let winnerTitle;
  switch (winner) {
    case 'player1':
      winnerTitle = 'Player 1';
      break;
    case 'player2':
      winnerTitle = 'Player 2';
      break;
    case 'self':
      winnerTitle = 'You';
      break;
    case 'cpu':
      winnerTitle = 'CPU';
      break;
    default:
      winnerTitle = 'Invalid';
  }
  return (
    <Panel className={classes}>
      <div className="result__container">
        <h4 className="result__winner">{winnerTitle}</h4>
        <span className="result__win-text">WINS</span>
        <Button small>Play Again</Button>
      </div>
    </Panel>
  );
}

Result.propTypes = {
  className: PropTypes.string,
  winner: PropTypes.oneOf(['player1', 'player2', 'self', 'cpu']).isRequired,
};

export default Result;
