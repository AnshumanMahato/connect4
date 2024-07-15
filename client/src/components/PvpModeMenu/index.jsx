import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../utils/Button';
import Panel from '../utils/Panel';
import { goToGame } from '../../store';
import { PVP } from '../../store/constants/gameConstants';
import './style.scss';

function DifficultyMenu(props) {
  const dispatch = useDispatch();
  const startGame = useCallback(() => {
    dispatch(goToGame({ mode: PVP }));
  }, [dispatch]);

  return (
    <Panel className="diffmenu" {...props}>
      <div className="diffmenu__container">
        <h1 className="diffmenu__title">Mode</h1>
        <div className="diffmenu__options">
          <Button className="diffmenu__option" onClick={() => startGame()}>
            ONLINE
          </Button>
          <Button
            yellow
            className="diffmenu__option"
            onClick={() => startGame()}
          >
            DEVICE
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default DifficultyMenu;
