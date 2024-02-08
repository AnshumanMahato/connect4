import PropTypes from 'prop-types';
import Panel from '../utils/Panel';
import Button from '../utils/Button';
import './style.scss';
import { useDispatch } from 'react-redux';
import { goToHome } from '../../store';
import { useCallback } from 'react';

function PauseMenu({ onClose: handleClose, onRestart: handleRestart }) {
  const dispatch = useDispatch();

  const handleQuit = useCallback(() => dispatch(goToHome()), [dispatch]);
  const handleRestartClick = useCallback(() => {
    handleRestart();
    handleClose();
  }, [handleClose, handleRestart]);

  return (
    <Panel className="pausemenu">
      <div className="pausemenu__container">
        <h1 className="pausemenu__title">PAUSE</h1>
        <div className="pausemenu__options">
          <Button onClick={handleClose} className="pausemenu__option">
            Continue Game
          </Button>
          <Button onClick={handleRestartClick} className="pausemenu__option">
            Restart
          </Button>
          <Button red onClick={handleQuit} className="pausemenu__option">
            Quit Game
          </Button>
        </div>
      </div>
    </Panel>
  );
}

PauseMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default PauseMenu;
