import Button from '../utils/Button';
import Panel from '../utils/Panel';
import Logo from '../../assets/images/logo.svg?react';
import Pvp from '../../assets/images/player-vs-player.svg?react';
import Pve from '../../assets/images/player-vs-cpu.svg?react';
import './style.scss';
import { useDispatch } from 'react-redux';
import { goToDifficulty, goToGame, goToRules } from '../../store';
import { useCallback } from 'react';

function MainMenu(props) {
  const dispatch = useDispatch();

  const handlePvpClick = useCallback(() => {
    dispatch(goToGame({ mode: 'pvp' }));
  }, [dispatch]);

  const handlePveClick = useCallback(() => {
    dispatch(goToDifficulty());
  }, [dispatch]);

  const handleRulesClick = useCallback(() => {
    dispatch(goToRules());
  }, [dispatch]);

  return (
    <Panel className="mainmenu" {...props}>
      <div className="mainmenu_container">
        <Logo className="logo mainmenu_logo" />
        <div className="mainmenu_options">
          <Button
            red
            className="mainmenu_option mainmenu_option--pvp"
            onClick={handlePveClick}
          >
            <span>Play vs cpu</span>
            <Pve className="mainmenu__option__icon" />
          </Button>
          <Button
            yellow
            className="mainmenu_option mainmenu_option--pvp"
            onClick={handlePvpClick}
          >
            <span>Play vs player</span>
            <Pvp className="mainmenu__option__icon" />
          </Button>
          <Button
            className="mainmenu_option mainmenu_option--rules"
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
