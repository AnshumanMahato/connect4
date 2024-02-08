import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../utils/Button';
import PauseMenu from '../PauseMenu';
import Logo from '../../assets/images/logo.svg?react';
import './style.scss';
import { useDispatch } from 'react-redux';
import { restartGame } from '../../store';

function GameNav({ className }) {
  const classes = classNames('gamenav', className);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  const handleMenuClick = useCallback(() => setShowMenu(true), []);
  const handleMenuClose = useCallback(() => setShowMenu(false), []);
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
        {showMenu && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PauseMenu onClose={handleMenuClose} onRestart={handleRestart} />
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
