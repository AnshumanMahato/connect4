import { useSelector } from 'react-redux';
import HomePage from './views/HomePage';
import GamePage from './views/GamePage';
import Components from './views/Components';
import RulesPage from './views/RulesPage';

function App() {
  const { current: currentPage } = useSelector((state) => state.navigation);

  if (currentPage === 'home') return <HomePage />;
  if (currentPage === 'game') return <GamePage />;
  if (currentPage === 'rules') return <RulesPage />;

  return <Components />;
}

export default App;
