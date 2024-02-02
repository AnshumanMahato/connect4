import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../utils/Button';
import PauseMenu from '../PauseMenu';
import Logo from '../../assets/images/logo.svg?react';
import './style.scss';

function GameNav({ className }) {
  const classes = classNames('gamenav', className);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = useCallback(() => setShowMenu(true), []);
  const handleMenuClose = useCallback(() => setShowMenu(false), []);

  return (
    <>
      <nav className={classes}>
        <Button small onClick={handleMenuClick}>
          menu
        </Button>
        <Logo />
        <Button small>restart</Button>
      </nav>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PauseMenu onClose={handleMenuClose} />
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
