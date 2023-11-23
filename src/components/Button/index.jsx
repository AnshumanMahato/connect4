import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

function Button({
  children,
  className,
  red,
  yellow,
  small,
  check,
  onClick: handleClick,
}) {
  const classes = classNames(
    'btn',
    {
      'btn--red': red,
      'btn--yellow': yellow,
      'btn--check': check,
      'btn--small': small,
    },
    className
  );
  return (
    <button className={classes} onClick={handleClick}>
      {check || children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  red: PropTypes.bool,
  yellow: PropTypes.bool,
  check: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
  checkVariation: ({ red, yellow, small }) => {
    const count = Number(!!red + !!yellow + !!small);
    if (count > 1)
      return new Error('Only one of red, yellow or small can be true');
  },
  checkChildren: ({ check, children }) => {
    if (!check && !children)
      return new Error('Must have children if not check');
  },
};

export default Button;
