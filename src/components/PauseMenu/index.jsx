import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Panel from '../utils/Panel';
import Button from '../utils/Button';
import { goToGame, goToHome, restartGame } from '../../store';
import './style.scss';

function PauseMenu() {
  const dispatch = useDispatch();

  const handleQuit = useCallback(() => dispatch(goToHome()), [dispatch]);
  const handleClose = useCallback(() => dispatch(goToGame()), [dispatch]);
  const handleRestart = useCallback(() => dispatch(restartGame()), [dispatch]);

  return (
    <Panel className="pausemenu">
      <div className="pausemenu__container">
        <h1 className="pausemenu__title">PAUSE</h1>
        <div className="pausemenu__options">
          <Button onClick={handleClose} className="pausemenu__option">
            Continue Game
          </Button>
          <Button onClick={handleRestart} className="pausemenu__option">
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

export default PauseMenu;
