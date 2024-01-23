import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

function GameFooter({ className, red, yellow }) {
  const classes = classNames(
    'gamefooter',
    {
      'gamefooter--red': red,
      'gamefooter--yellow': yellow,
    },
    className
  );

  return <div className={classes}></div>;
}

GameFooter.propTypes = {
  className: PropTypes.string,
  red: PropTypes.bool,
  yellow: PropTypes.bool,
  checkVariation: ({ red, yellow }) => {
    const count = Number(!!red + !!yellow);
    if (count > 1) return new Error('Only one of red or yellow can be true');
  },
};

export default GameFooter;
