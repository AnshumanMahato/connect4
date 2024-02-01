import { motion } from 'framer-motion';
import MainMenu from '../../components/MainMenu';
import './style.scss';

function HomePage() {
  return (
    <motion.main
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MainMenu />
    </motion.main>
  );
}

export default HomePage;
