import { motion } from 'framer-motion';
import Rules from '../../components/Rules';
import './style.scss';

function RulesPage() {
  return (
    <motion.main
      className="rules-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Rules
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.main>
  );
}

export default RulesPage;
