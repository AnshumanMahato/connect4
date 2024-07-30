import { AnimatePresence, motion } from 'framer-motion';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import GameNav from '../../components/GameNav';
import ScoreCard from '../../components/ScoreCard';
import PauseMenu from '../../components/menus/PauseMenu';
import { NOTIFICATION, PAUSE } from '../../store/constants/navConatansts';
import Notification from '../../components/Notification';
import { goToHome } from '../../store';

function GamePage() {
  const {
    player1,
    player2,
    scoreP1,
    scoreP2,
    current: currentPage,
    notification,
  } = useSelector((state) => {
    const { player1, player2, scoreP1, scoreP2 } = state.game;
    const { current, notification } = state.navigation;
    return { player1, player2, scoreP1, scoreP2, current, notification };
  }, shallowEqual);

  const dispatch = useDispatch();

  return (
    <motion.main
      className="game-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameNav />
      <GameBoard />
      <ScoreCard player={player1} score={scoreP1} />
      <ScoreCard player={player2} score={scoreP2} />
      <GameFooter className="footer" />
      <AnimatePresence mode="wait">
        {(currentPage === NOTIFICATION || currentPage === PAUSE) && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
          >
            {currentPage === NOTIFICATION && (
              <Notification
                key={notification.type}
                title={notification.title}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
                onClose={
                  notification.type === 'error'
                    ? () => dispatch(goToHome())
                    : null
                }
              >
                {notification.message}
              </Notification>
            )}
            {currentPage === PAUSE && (
              <PauseMenu
                key="pause-menu"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default GamePage;
