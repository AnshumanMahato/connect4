import useGameLogic from '../hooks/useGameLogic';
import ControlColumns from './ControlColums';
import CounterGrid from './CounterGrid';

function CounterInterface() {
  const [grid, setPosition] = useGameLogic();

  return (
    <>
      <CounterGrid grid={grid} setPosition={setPosition} />
      <ControlColumns setPosition={setPosition} />
    </>
  );
}

export default CounterInterface;
