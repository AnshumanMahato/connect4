import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import Logo from '../../assets/images/logo.svg?react';
import './style.scss';

function GameNav({ className }) {
  const classes = classNames('gamenav', className);

  return (
    <nav className={classes}>
      <Button small>menu</Button>
      <Logo />
      <Button small>restart</Button>
    </nav>
  );
}

GameNav.propTypes = {
  className: PropTypes.string,
};

export default GameNav;
