import { AnimatePresence, motion } from 'framer-motion';
import { shallowEqual, useSelector } from 'react-redux';
import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import GameNav from '../../components/GameNav';
import ScoreCard from '../../components/utils/ScoreCard';
import PauseMenu from '../../components/PauseMenu';
import { PAUSE } from '../../store/constants/navConatansts';
import './style.scss';

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
        {currentPage === PAUSE && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
          >
            <PauseMenu
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default GamePage;
