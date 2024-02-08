import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import TimerBgRed from '../../../assets/images/turn-background-red.svg?react';
import TimerBgYellow from '../../../assets/images/turn-background-yellow.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { switchPlayer } from '../../../store';

function Timer({ className, duration }) {
  const classes = classNames('timer', className);

  const dispatch = useDispatch();
  const { currentPlayer } = useSelector((state) => state.game);

  const interval = useRef(null);
  const prevPlayer = useRef(currentPlayer);
  let [time, setTime] = useState(duration);

  useEffect(() => {
    if (prevPlayer.current !== currentPlayer) {
      //Reset timer when current player changes
      prevPlayer.current = currentPlayer;
      setTime(duration);
    }

    interval.current = setTimeout(() => {
      if (time === 0) {
        //switch player when time ends
        dispatch(switchPlayer());
      }
      setTime((currTime) => currTime - 1);
    }, 1000);

    return () => clearTimeout(interval.current);
  }, [time, duration, currentPlayer, dispatch]);

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
  duration: PropTypes.number.isRequired,
};

export default Timer;
