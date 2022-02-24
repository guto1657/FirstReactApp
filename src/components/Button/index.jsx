import P from 'prop-types';
import './style.css';

export const Button = ({ text, onClick, disabled = false }) => {
  return (
    <button disabled={disabled} className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
