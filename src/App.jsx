import Button from './components/Button';
import MainMenu from './components/MainMenu';
import PauseMenu from './components/PauseMenu';
import Rules from './components/Rules';
import ScoreCard from './components/ScoreCard';
import Timer from './components/Timer';

function App() {
  return (
    <>
      <div>
        <MainMenu />
      </div>
      <br />
      <br />
      <div>
        <PauseMenu />
      </div>
      <br />
      <br />
      <div>
        <Rules />
      </div>
      <br />
      <br />
      <div>
        <ScoreCard player="player1" score={12} />
      </div>
      <br />
      <br />
      <div>
        <Timer player="player1" />
      </div>
      <br />
      <br />

      <div>
        <Button small>game</Button>
        <h1 className="heading--l">Heading (L)</h1>
        <h2 className="heading--m">Heading (M)</h2>
        <h3 className="heading--s">Heading (S)</h3>
        <h4 className="heading--xs">Heading (XS)</h4>
      </div>
    </>
  );
}

export default App;
