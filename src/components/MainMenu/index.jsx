import Panel from '../Panel';
import Logo from '../../assets/images/logo.svg?react';
import Pvp from '../../assets/images/player-vs-player.svg?react';
import './style.scss';
import Button from '../Button';

function MainMenu() {
  return (
    <Panel className="mainmenu">
      <div className="mainmenu_container">
        <Logo className="logo mainmenu_logo" />
        <div className="mainmenu_options">
          <Button yellow className="mainmenu_option mainmenu_option--pvp">
            <span>Player vs player</span>
            <Pvp className="mainmenu__option__icon" />
          </Button>
          <Button className="mainmenu_option mainmenu_option--rules">
            GAME RULES
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default MainMenu;
