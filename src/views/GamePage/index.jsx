import GameBoard from '../../components/GameBoard';
import GameNav from '../../components/GameNav';
import './style.scss';

function GamePage() {
  return (
    <main className="game-page">
      <GameNav />
      <GameBoard />
    </main>
  );
}

export default GamePage;
