import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './index';

describe('<TextInput/>', () => {
  it('Should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testing'} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input.value).toBe('testing');
  });

  it('Should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="a value" />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'a value';

    userEvent.type(input, value);

    expect(input.value).toBe('a value');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue={''} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
