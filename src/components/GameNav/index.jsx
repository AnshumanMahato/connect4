import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../utils/Button';
import PauseMenu from '../PauseMenu';
import Logo from '../../assets/images/logo.svg?react';
import { goToPause, restartGame } from '../../store';
import { PAUSE } from '../../store/constants/navConatansts';
import './style.scss';

function GameNav({ className }) {
  const classes = classNames('gamenav', className);
  const { current: currentPage } = useSelector((state) => state.navigation);

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
      <AnimatePresence>
        {currentPage === PAUSE && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PauseMenu onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

GameNav.propTypes = {
  className: PropTypes.string,
};

export default GameNav;
