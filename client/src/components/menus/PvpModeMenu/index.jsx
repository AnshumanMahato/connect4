import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../utils/Button';
import Panel from '../../utils/Panel';
import { goToConnect, goToGame } from '../../../store';
import { PVP } from '../../../store/constants/gameConstants';

function PvpModeMenu(props) {
  const dispatch = useDispatch();
  const startGame = useCallback(() => {
    dispatch(goToGame({ mode: PVP }));
  }, [dispatch]);
  const startConnection = useCallback(() => {
    dispatch(goToConnect());
  }, [dispatch]);

  return (
    <Panel className="pvpmenu" {...props}>
      <div className="pvpmenu__container">
        <h1 className="pvpmenu__title">Mode</h1>
        <div className="pvpmenu__options">
          <Button className="pvpmenu__option" onClick={() => startConnection()}>
            ONLINE
          </Button>
          <Button
            yellow
            className="pvpmenu__option"
            onClick={() => startGame()}
          >
            SAME DEVICE
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default PvpModeMenu;
