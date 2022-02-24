import P from 'prop-types';
import './style.css';

export const TextInput = ({ searchValue, handleChange }) => (
  <input
    onChange={handleChange}
    value={searchValue}
    type="search"
    className="text-input"
    placeholder="Type your search"
  />
);

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
