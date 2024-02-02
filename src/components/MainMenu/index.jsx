import Button from '../utils/Button';
import Panel from '../utils/Panel';
import Logo from '../../assets/images/logo.svg?react';
import Pvp from '../../assets/images/player-vs-player.svg?react';
import './style.scss';
import { useDispatch } from 'react-redux';
import { goToGame, goToRules } from '../../store';

function MainMenu() {
  const dispatch = useDispatch();

  const handlePvpClick = () => {
    dispatch(goToGame());
  };

  const handleRulesClick = () => {
    dispatch(goToRules());
  };

  return (
    <Panel className="mainmenu">
      <div className="mainmenu_container">
        <Logo className="logo mainmenu_logo" />
        <div className="mainmenu_options">
          <Button
            yellow
            className="mainmenu_option mainmenu_option--pvp"
            onClick={handlePvpClick}
          >
            <span>Player vs player</span>
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
