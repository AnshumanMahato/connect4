import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../utils/Button';
import Panel from '../../utils/Panel';
import { goToGame } from '../../../store';
import { PVP } from '../../../store/constants/gameConstants';
import TextBox from '../../utils/TextBox';

function RoomsMenu(props) {
  const [roomId, setRoomId] = useState('');
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    setRoomId(e.target.value);
  }, []);

  const startGame = useCallback(() => {
    dispatch(goToGame({ mode: PVP }));
  }, [dispatch]);

  return (
    <Panel className="roomsmenu" {...props}>
      <div className="roomsmenu__container">
        <h1 className="roomsmenu__title">START GAME</h1>
        <div className="roomsmenu__options">
          <TextBox
            className="roomsmenu__option"
            type="text"
            value={roomId}
            onChange={handleChange}
            placeholder="enter ROOM ID"
            maxlength="6"
          />
          <Button className="roomsmenu__option" onClick={() => startGame()}>
            JOIN ROOM
          </Button>
          <hr className="roomsmenu__divider" />
          <Button
            yellow
            className="roomsmenu__option"
            onClick={() => startGame()}
          >
            CREATE ROOM
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default RoomsMenu;
