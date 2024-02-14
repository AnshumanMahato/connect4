import { motion } from 'framer-motion';
import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import { useSelector } from 'react-redux';
import GameNav from '../../components/GameNav';
import ScoreCard from '../../components/utils/ScoreCard';
import './style.scss';

function GamePage() {
  const { player1, player2, scoreP1, scoreP2 } = useSelector(
    (state) => state.game
  );

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
    </motion.main>
  );
}

export default GamePage;
