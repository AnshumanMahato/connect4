import { motion } from 'framer-motion';
import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import GameNav from '../../components/GameNav';
import ScoreCard from '../../components/utils/ScoreCard';
import './style.scss';

function GamePage() {
  return (
    <motion.main
      className="game-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameNav />
      <GameBoard />
      <ScoreCard player="player1" score={0} />
      <ScoreCard player="player2" score={0} />
      <GameFooter className="footer" />
    </motion.main>
  );
}

export default GamePage;
