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
      <Rules />
    </motion.main>
  );
}

export default RulesPage;
