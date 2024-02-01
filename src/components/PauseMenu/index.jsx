import PropTypes from 'prop-types';
import Panel from '../Panel';
import Button from '../Button';
import './style.scss';
import { useDispatch } from 'react-redux';
import { goToHome } from '../../store';

function PauseMenu({ onClose: handleClose }) {
  const dispatch = useDispatch();

  const handleQuit = () => {
    dispatch(goToHome());
  };

  return (
    <Panel className="pausemenu">
      <div className="pausemenu__container">
        <h1 className="pausemenu__title">PAUSE</h1>
        <div className="pausemenu__options">
          <Button className="pausemenu__option" onClick={handleClose}>
            Continue Game
          </Button>
          <Button className="pausemenu__option">Restart</Button>
          <Button className="pausemenu__option" red onClick={handleQuit}>
            Quit Game
          </Button>
        </div>
      </div>
    </Panel>
  );
}

PauseMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PauseMenu;
