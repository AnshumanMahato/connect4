import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

function Panel({ children, className }) {
  const classes = classNames('panel', className);

  return <div className={classes}>{children}</div>;
}

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Panel;
