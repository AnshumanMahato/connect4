import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

function Button({ children, className }) {
  const classes = classNames('btn', className);
  return <button className={classes}>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
