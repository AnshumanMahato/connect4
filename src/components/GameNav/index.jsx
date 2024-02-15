import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../utils/Button';
import Logo from '../../assets/images/logo.svg?react';
import { goToPause, restartGame } from '../../store';
import './style.scss';

function GameNav({ className }) {
  const classes = classNames('gamenav', className);

  const dispatch = useDispatch();

  const handleMenuClick = useCallback(() => dispatch(goToPause()), [dispatch]);
  const handleRestart = useCallback(() => dispatch(restartGame()), [dispatch]);

  return (
    <>
      <nav className={classes}>
        <Button small onClick={handleMenuClick} className="gamenav__button">
          menu
        </Button>
        <Logo className="gamenav__logo" />
        <Button small onClick={handleRestart} className="gamenav__button">
          restart
        </Button>
      </nav>
    </>
  );
}

GameNav.propTypes = {
  className: PropTypes.string,
};

export default GameNav;
