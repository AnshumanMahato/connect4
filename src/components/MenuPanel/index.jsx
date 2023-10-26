import PropTypes from 'prop-types';
import './style.scss';

function MenuPanel({ children }) {
  return <div className="menupanel">{children}</div>;
}

MenuPanel.propTypes = {
  children: PropTypes.node,
};

export default MenuPanel;
