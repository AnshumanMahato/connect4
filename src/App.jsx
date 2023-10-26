import Button from './components/Button';
import MenuPanel from './components/MenuPanel';

function App() {
  return (
    <>
      <div>
        <Button small>game</Button>
        <h1>Heading (L)</h1>
        <h2>Heading (M)</h2>
        <h3>Heading (S)</h3>
        <h4>Heading (XS)</h4>
      </div>
      <div>
        <MenuPanel>Hello</MenuPanel>
      </div>
    </>
  );
}

export default App;
