import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TimerBgRed from '../../../assets/images/turn-background-red.svg?react';
import TimerBgYellow from '../../../assets/images/turn-background-yellow.svg?react';

function Timer({ className }) {
  const classes = classNames('timer', className);

  const { currentPlayer, time } = useSelector((state) => state.game);

  let timerTitle, TimerBackground;
  switch (currentPlayer) {
    case 'cpu':
      timerTitle = "CPU's Turn";
      TimerBackground = TimerBgYellow;
      break;
    case 'player1':
      timerTitle = "Player 1's Turn";
      TimerBackground = TimerBgRed;
      break;
    case 'player2':
      timerTitle = "Player 2's Turn";
      TimerBackground = TimerBgYellow;
      break;
    case 'self':
      timerTitle = 'Your Turn';
      TimerBackground = TimerBgRed;
      break;
    default:
      timerTitle = 'Invalid';
      TimerBackground = TimerBgRed;
  }
  return (
    <div className={classes}>
      <TimerBackground className="timer__background" />
      <div className="timer__container">
        <h4 className="timer__title">{timerTitle}</h4>
        <span className="timer__time">{time}s</span>
      </div>
    </div>
  );
}

Timer.propTypes = {
  className: PropTypes.string,
};

export default Timer;
