import Button from './components/Button';
import MainMenu from './components/MainMenu';

function App() {
  return (
    <>
      <div>
        <MainMenu />
      </div>
      <br />
      <br />
      <div>
        <Button small>game</Button>
        <h1>Heading (L)</h1>
        <h2>Heading (M)</h2>
        <h3>Heading (S)</h3>
        <h4>Heading (XS)</h4>
      </div>
    </>
  );
}

export default App;
