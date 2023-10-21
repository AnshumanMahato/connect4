import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

function Button({ children, className, red, yellow, check }) {
  const classes = classNames(
    'btn',
    {
      'btn--red': red,
      'btn--yellow': yellow,
      'btn--check': check,
    },
    className
  );
  return <button className={classes}>{check || children}</button>;
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  red: PropTypes.bool,
  yellow: PropTypes.bool,
  check: PropTypes.bool,
  checkVariation: ({ red, yellow }) => {
    const count = Number(!!red + !!yellow);
    if (count < 1) return new Error('Only one of red or can be true');
  },
  checkChildren: ({ check, children }) => {
    if (!check && !children)
      return new Error('Must have children if not check');
  },
};

export default Button;
