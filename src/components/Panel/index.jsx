import PropTypes from 'prop-types';
import './style.scss';

function Panel({ children }) {
  return <div className="panel">{children}</div>;
}

Panel.propTypes = {
  children: PropTypes.node,
};

export default Panel;
