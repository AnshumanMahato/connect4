import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import GameNav from '../../components/GameNav';
import './style.scss';

function GamePage() {
  return (
    <main className="game-page">
      <GameNav />
      <GameBoard />
      <GameFooter className="footer" />
    </main>
  );
}

export default GamePage;
