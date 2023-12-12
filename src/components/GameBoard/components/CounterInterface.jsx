import useGameLogic from '../hooks/useGameLogic';
import CounterGrid from './CounterGrid';

function CounterInterface() {
  const [grid, setPosition] = useGameLogic();

  return (
    <>
      <CounterGrid grid={grid} setPosition={setPosition} />
    </>
  );
}

export default CounterInterface;
