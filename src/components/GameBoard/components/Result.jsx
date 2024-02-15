import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetBoard } from '../../../store';
import Panel from '../../utils/Panel';
import Button from '../../utils/Button';

function Result({ className, isDraw, winner }) {
  const classes = classNames('result', className);

  const dispatch = useDispatch();

  const handleReset = useCallback(() => dispatch(resetBoard()), [dispatch]);

  let winnerTitle = ' ';
  if (!isDraw) {
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
  }

  return (
    <Panel className={classes}>
      <div className="result__container">
        <h3 className="result__winner">{winnerTitle}</h3>
        <span className="result__win-text">{(isDraw && 'DRAW') || 'WINS'}</span>
        <Button small onClick={handleReset}>
          Play Again
        </Button>
      </div>
    </Panel>
  );
}

Result.propTypes = {
  className: PropTypes.string,
  winner: PropTypes.oneOf(['player1', 'player2', 'self', 'cpu']),
  isDraw: PropTypes.bool,
  checkVariation: ({ isDraw, winner }) => {
    if (isDraw && winner)
      return new Error(
        'A game cannot have a winner and be a draw at the same time'
      );
    if (!isDraw && !winner)
      return new Error('A game must have a winner or be a draw');
  },
};

export default Result;
