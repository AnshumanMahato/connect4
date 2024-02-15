import { AnimatePresence, motion } from 'framer-motion';
import MainMenu from '../../components/MainMenu';
import './style.scss';
import DifficultyMenu from '../../components/DifficultyMenu';
import { useSelector } from 'react-redux';
import { DIFFICULTY, HOME } from '../../store/constants/navConatansts';

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
      <AnimatePresence>
        {currentPage === HOME && (
          <MainMenu
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          />
        )}
        {currentPage === DIFFICULTY && (
          <DifficultyMenu
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.5, duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default HomePage;
