import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../utils/Button';
import Panel from '../../utils/Panel';
import { goToGame } from '../../../store';
import { PVP } from '../../../store/constants/gameConstants';

function ConnectMenu(props) {
  const dispatch = useDispatch();
  const startGame = useCallback(() => {
    dispatch(goToGame({ mode: PVP }));
  }, [dispatch]);

  return (
    <Panel className="connectmenu" {...props}>
      <div className="connectmenu__container">
        <h1 className="connectmenu__title">START GAME</h1>
        <div className="connectmenu__options">
          <Button className="connectmenu__option" onClick={() => startGame()}>
            JOIN ROOM
          </Button>
          <Button
            yellow
            className="connectmenu__option"
            onClick={() => startGame()}
          >
            CREATE ROOM
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default ConnectMenu;
