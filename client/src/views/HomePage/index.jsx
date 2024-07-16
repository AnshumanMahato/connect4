import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import MainMenu from '../../components/menus/MainMenu';
import DifficultyMenu from '../../components/menus/DifficultyMenu';
import {
  DIFFICULTY,
  HOME,
  PVP_MODE,
} from '../../store/constants/navConatansts';
import PvpModeMenu from '../../components/menus/PvpModeMenu';

function HomePage() {
  const { current: currentPage } = useSelector((state) => state.navigation);
  return (
    <motion.main
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {currentPage === HOME && (
          <MainMenu
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            key="main-menu"
          />
        )}
        {currentPage === DIFFICULTY && (
          <DifficultyMenu
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.5, duration: 0.2 }}
            key="difficulty-menu"
          />
        )}
        {currentPage === PVP_MODE && (
          <PvpModeMenu
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.5, duration: 0.2 }}
            key="pvp-mode-menu"
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default HomePage;
