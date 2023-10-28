import Panel from '../Panel';
import Button from '../Button';
import './style.scss';

function PauseMenu() {
  return (
    <Panel className="pausemenu">
      <div className="pausemenu__container">
        <h1 className="pausemenu__title">PAUSE</h1>
        <div className="pausemenu__options">
          <Button className="pausemenu__option">Continue Game</Button>
          <Button className="pausemenu__option">Restart</Button>
          <Button red>Quit Game</Button>
        </div>
      </div>
    </Panel>
  );
}

export default PauseMenu;
