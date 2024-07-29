import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../utils/Button';
import Panel from '../../utils/Panel';
import Logo from '../../../assets/images/logo.svg?react';
import Pvp from '../../../assets/images/player-vs-player.svg?react';
import Pve from '../../../assets/images/player-vs-cpu.svg?react';
import { goToDifficulty, goToPvpRooms, goToRules } from '../../../store';

function MainMenu(props) {
  const dispatch = useDispatch();

  const handlePvpClick = useCallback(() => {
    dispatch(goToPvpRooms());
  }, [dispatch]);

  const handlePveClick = useCallback(() => {
    dispatch(goToDifficulty());
  }, [dispatch]);

  const handleRulesClick = useCallback(() => {
    dispatch(goToRules());
  }, [dispatch]);

  return (
    <Panel className="mainmenu" {...props}>
      <div className="mainmenu__container">
        <Logo className="logo mainmenu__logo" />
        <div className="mainmenu__options">
          <Button
            red
            className="mainmenu__option mainmenu__option--pvp"
            onClick={handlePveClick}
          >
            <span>Play vs cpu</span>
            <Pve className="mainmenu__option__icon" />
          </Button>
          <Button
            yellow
            className="mainmenu__option mainmenu__option--pvp"
            onClick={handlePvpClick}
          >
            <span>Play vs player</span>
            <Pvp className="mainmenu__option__icon" />
          </Button>
          <Button
            className="mainmenu__option mainmenu__option--rules"
            onClick={handleRulesClick}
          >
            GAME RULES
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default MainMenu;
