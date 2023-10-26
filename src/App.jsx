import Button from './components/Button';
import Panel from './components/Panel';

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
        <Panel>Hello</Panel>
      </div>
    </>
  );
}

export default App;
