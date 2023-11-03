import { useState } from 'react';
import PropTypes from 'prop-types';
import TimerBgRed from '../../assets/images/turn-background-red.svg?react';
import TimerBgYellow from '../../assets/images/turn-background-yellow.svg?react';
import './style.scss';
import { useRef } from 'react';
import { useEffect } from 'react';

function Timer({ player }) {
  let [time, setTime] = useState(15);
  const interval = useRef(null);

  useEffect(() => {
    if (time === 0) {
      clearInterval(interval.current);
    }
    console.log(interval.current);
    if (!interval.current) {
      console.log('timer started');
      interval.current = setInterval(() => {
        console.log('timer tick');
        setTime((time) => time - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval.current);
      interval.current = null;
      console.log('timer cleared');
    };
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
    <div className="timer">
      <TimerBackground className="timer__background" />
      <div className="timer__container">
        <h4 className="timer__title">{timerTitle}</h4>
        <span className="timer__time">{time}s</span>
      </div>
    </div>
  );
}

Timer.propTypes = {
  player: PropTypes.oneOf(['self', 'cpu', 'player1', 'player2']).isRequired,
};

export default Timer;
