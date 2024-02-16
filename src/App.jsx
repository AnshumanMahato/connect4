import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import HomePage from './views/HomePage';
import GamePage from './views/GamePage';
import RulesPage from './views/RulesPage';
import { GAME, HOME, RULES } from './store/constants/navConatansts';

function App() {
  const { current: currentPage } = useSelector((state) => state.navigation);

  return (
    <AnimatePresence mode="wait">
      {currentPage.startsWith(HOME) && <HomePage key="homepage" />}
      {currentPage.startsWith(GAME) && <GamePage key="gamepage" />}
      {currentPage.startsWith(RULES) && <RulesPage key="rules" />}
    </AnimatePresence>
  );
}

export default App;
