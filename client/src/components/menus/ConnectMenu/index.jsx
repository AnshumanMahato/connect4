import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../utils/Button';
import Panel from '../../utils/Panel';
import { goToGame } from '../../../store';
import { PVP } from '../../../store/constants/gameConstants';
import TextBox from '../../utils/TextBox';

function ConnectMenu(props) {
  const [roomId, setRoomId] = useState('');
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    setRoomId(e.target.value);
  }, []);

  const startGame = useCallback(() => {
    dispatch(goToGame({ mode: PVP }));
  }, [dispatch]);

  return (
    <Panel className="connectmenu" {...props}>
      <div className="connectmenu__container">
        <h1 className="connectmenu__title">START GAME</h1>
        <div className="connectmenu__options">
          <TextBox
            className="connectmenu__option"
            type="text"
            value={roomId}
            onChange={handleChange}
            placeholder="enter ROOM ID"
            maxlength="6"
          />
          <Button className="connectmenu__option" onClick={() => startGame()}>
            JOIN ROOM
          </Button>
          <hr className="connectmenu__divider" />
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
