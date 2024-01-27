import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import GameNav from '../../components/GameNav';
import ScoreCard from '../../components/ScoreCard';
import './style.scss';

function GamePage() {
  return (
    <main className="game-page">
      <GameNav />
      <GameBoard />
      <ScoreCard player="player1" score={0} />
      <ScoreCard player="player2" score={0} />
      <GameFooter className="footer" />
    </main>
  );
}

export default GamePage;
