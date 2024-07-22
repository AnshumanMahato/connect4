import { AnimatePresence, motion } from 'framer-motion';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import GameNav from '../../components/GameNav';
import ScoreCard from '../../components/ScoreCard';
import PauseMenu from '../../components/menus/PauseMenu';
import {
  CONNECTING,
  CONNECTION_FAILED,
  PAUSE,
} from '../../store/constants/navConatansts';
import Notification from '../../components/Notification';
import { goToHome } from '../../store';

function GamePage() {
  const {
    player1,
    player2,
    scoreP1,
    scoreP2,
    current: currentPage,
  } = useSelector((state) => {
    const { player1, player2, scoreP1, scoreP2 } = state.game;
    const { current } = state.navigation;
    return { player1, player2, scoreP1, scoreP2, current };
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
        {(currentPage === CONNECTING ||
          currentPage === CONNECTION_FAILED ||
          currentPage === PAUSE) && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
          >
            {currentPage === CONNECTING && (
              <Notification
                key="connecting"
                title="CONNECTING"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                Connecting to the server...
              </Notification>
            )}
            {currentPage === CONNECTION_FAILED && (
              <Notification
                key="connection-failed"
                title="CONNECTION FAILED"
                onClose={() => dispatch(goToHome())}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                Connection to the server failed. Please try again.
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
