import PropTypes from 'prop-types';
import Button from '../utils/Button';
import Panel from '../utils/Panel';

function Notification({ title, children, onClose: handleClose, ...rest }) {
  return (
    <Panel className="notification" {...rest}>
      <div className="notification__container">
        <h1 className="notification__title">{title}.</h1>
        <section className="notification__section">
          <div className="notification__description">
            <p>{children}</p>
          </div>
        </section>
        {handleClose && (
          <Button
            red
            check
            className="notification__close"
            onClick={(e) => handleClose(e)}
          >
            Back
          </Button>
        )}
      </div>
    </Panel>
  );
}

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default Notification;
