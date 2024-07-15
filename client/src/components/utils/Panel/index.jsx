import { motion } from 'framer-motion';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

function Panel({ children, className, ...rest }) {
  const classes = classNames('panel', className);

  return (
    <motion.div className={classes} {...rest}>
      {children}
    </motion.div>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Panel;
