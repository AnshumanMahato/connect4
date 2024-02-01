import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import HomePage from './views/HomePage';
import GamePage from './views/GamePage';
import Components from './views/Components';
import RulesPage from './views/RulesPage';

function App() {
  const { current: currentPage } = useSelector((state) => state.navigation);

  return (
    <AnimatePresence>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'game' && <GamePage />}
      {currentPage === 'rules' && <RulesPage />}
      {currentPage === 'components' && <Components />}
    </AnimatePresence>
  );
}

export default App;
