import Button from '../utils/Button';
import Panel from '../utils/Panel';
import './style.scss';

function DifficultyMenu(props) {
  return (
    <Panel className="diffmenu" {...props}>
      <div className="diffmenu__container">
        <h1 className="diffmenu__title">Difficulty</h1>
        <div className="diffmenu__options">
          <Button className="diffmenu__option">EASY</Button>
          <Button yellow className="diffmenu__option">
            MEDIUM
          </Button>
          <Button red className="diffmenu__option">
            HARD
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default DifficultyMenu;
