import Button from '../Button';
import Panel from '../Panel';
import './style.scss';

function Rules() {
  return (
    <Panel className="rules">
      <div className="rules__container">
        <h1 className="rules__title">RULES</h1>
        <section className="rules__section">
          <h3 className="rules__heading">OBJECTIVE</h3>
          <div className="rules__description">
            <p>
              Be the first player to connect 4 of the same colored discs in a
              row (either vertically, horizontally, or diagonally).
            </p>
          </div>
        </section>
        <section className="rules__section">
          <h3 className="rules__heading">HOW TO PLAY</h3>
          <div className="rules__description">
            <ul className="rules__list">
              <li className="rules__rule">Red goes first in the first game.</li>
              <li className="rules__rule">
                Players must alternate turns, and only one disc can be dropped
                in each turn.
              </li>
              <li className="rules__rule">
                The game ends when there is a 4-in-a-row or a stalemate.
              </li>
              <li className="rules__rule">
                The starter of the previous game goes second on the next game.
              </li>
            </ul>
          </div>
        </section>
        <Button red check className="rules__close">
          Back
        </Button>
      </div>
    </Panel>
  );
}

export default Rules;
