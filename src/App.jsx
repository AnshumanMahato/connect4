import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import HomePage from './views/HomePage';
import GamePage from './views/GamePage';
import RulesPage from './views/RulesPage';
import { GAME, HOME, RULES } from './store/constants/navConatansts';

function App() {
  const { current: currentPage } = useSelector((state) => state.navigation);

  return (
    <AnimatePresence>
      {currentPage.startsWith(HOME) && <HomePage />}
      {currentPage.startsWith(GAME) && <GamePage />}
      {currentPage.startsWith(RULES) && <RulesPage />}
    </AnimatePresence>
  );
}

export default App;
