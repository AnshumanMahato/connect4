import Panel from '../Panel';
import PropTypes from 'prop-types';
import Cpu from '../../assets/images/cpu.svg?react';
import Player from '../../assets/images/you.svg?react';
import Player1 from '../../assets/images/player-one.svg?react';
import Player2 from '../../assets/images/player-two.svg?react';
import './style.scss';

const Invalid = ({ className }) => (
  <img src="" alt="invalid" className={className} />
);

function ScoreCard({ player, score }) {
  let PlayerIcon, playerName;
  switch (player) {
    case 'cpu':
      PlayerIcon = Cpu;
      playerName = 'CPU';
      break;
    case 'player1':
      PlayerIcon = Player1;
      playerName = 'Player 1';
      break;
    case 'player2':
      PlayerIcon = Player2;
      playerName = 'Player 2';
      break;
    case 'self':
      PlayerIcon = Player;
      playerName = 'You';
      break;
    default:
      PlayerIcon = Invalid;
      playerName = 'Invalid';
  }

  return (
    <Panel className={`scorecard scorecard--${player}`}>
      <PlayerIcon className="scorecard__icon" />
      <div className="scorecard__container">
        <h3 className="scorecard__player">{playerName}</h3>
        <span className="scorecard__score">{score}</span>
      </div>
    </Panel>
  );
}

Invalid.propTypes = {
  className: PropTypes.string,
};

ScoreCard.propTypes = {
  player: PropTypes.oneOf(['self', 'cpu', 'player1', 'player2']).isRequired,
  score: PropTypes.number.isRequired,
};

export default ScoreCard;
