import useGameLogic from '../hooks/useGameLogic';
import ControlColumns from './ControlColums';
import CounterGrid from './CounterGrid';

function CounterInterface() {
  const [grid, insertCounter] = useGameLogic();

  return (
    <>
      <CounterGrid grid={grid} />
      <ControlColumns insertCounter={insertCounter} grid={grid} />
    </>
  );
}

export default CounterInterface;
