import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TimerBgRed from '../../../assets/images/turn-background-red.svg?react';
import TimerBgYellow from '../../../assets/images/turn-background-yellow.svg?react';
import './style.scss';
import classNames from 'classnames';

function Timer({ player, className }) {
  const classes = classNames('timer', className);
  const interval = useRef(null);
  let [time, setTime] = useState(15);

  useEffect(() => {
    interval.current = setTimeout(() => {
      if (time === 0) {
        clearTimeout(interval.current);
        return;
      }
      setTime((currTime) => currTime - 1);
    }, 1000);

    return () => clearTimeout(interval.current);
  }, [time]);

  let timerTitle, TimerBackground;
  switch (player) {
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
  player: PropTypes.oneOf(['self', 'cpu', 'player1', 'player2']).isRequired,
};

export default Timer;
