import Panel from '../Panel';
import PropTypes from 'prop-types';
import Player1 from '../../assets/images/player-one.svg?react';
import Player2 from '../../assets/images/player-two.svg?react';
import './style.scss';

function ScoreCard({ player }) {
  const PlayerIcon = player === 1 ? Player1 : Player2;
  const score = 12;

  return (
    <Panel className="scorecard">
      <PlayerIcon className="scorecard__icon" />
      <div className="scorecard__container">
        <h3 className="scorecard__player">Player {player}</h3>
        <span className="scorecard__score">{score}</span>
      </div>
    </Panel>
  );
}

ScoreCard.propTypes = {
  player: PropTypes.oneOf([1, 2]),
  checkType: ({ player }) => {
    if (!player) return new Error('Must have an associated player');
  },
};

export default ScoreCard;
