import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetBoard } from '../../../store';
import Panel from '../../utils/Panel';
import Button from '../../utils/Button';

function Result({ className, winner }) {
  const classes = classNames('result', className);

  const dispatch = useDispatch();

  const handleReset = useCallback(() => dispatch(resetBoard()), [dispatch]);

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
        <Button small onClick={handleReset}>
          Play Again
        </Button>
      </div>
    </Panel>
  );
}

Result.propTypes = {
  className: PropTypes.string,
  winner: PropTypes.oneOf(['player1', 'player2', 'self', 'cpu']).isRequired,
};

export default Result;
