import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../utils/Button';
import Panel from '../utils/Panel';
import { goToGame } from '../../store';
import { EASY, HARD, MEDIUM, PVE } from '../../store/constants/gameConstants';
import './style.scss';

function DifficultyMenu(props) {
  const dispatch = useDispatch();
  const startGame = useCallback(
    (difficulty) => {
      dispatch(goToGame({ mode: PVE, difficulty }));
    },
    [dispatch]
  );

  return (
    <Panel className="diffmenu" {...props}>
      <div className="diffmenu__container">
        <h1 className="diffmenu__title">Difficulty</h1>
        <div className="diffmenu__options">
          <Button className="diffmenu__option" onClick={() => startGame(EASY)}>
            EASY
          </Button>
          <Button
            yellow
            className="diffmenu__option"
            onClick={() => startGame(MEDIUM)}
          >
            MEDIUM
          </Button>
          <Button
            red
            className="diffmenu__option"
            onClick={() => startGame(HARD)}
          >
            HARD
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default DifficultyMenu;
