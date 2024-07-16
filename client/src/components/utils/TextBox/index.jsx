import classNames from 'classnames';
import PropTypes from 'prop-types';

function TextBox({ className, value, onChange: handleChange, ...rest }) {
  const classes = classNames('textbox', className);

  return (
    <input
      value={value}
      type="text"
      className={classes}
      onChange={handleChange}
      {...rest}
    />
  );
}

TextBox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextBox;
