import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  test('renders button with given text', () => {
    render(<Button text='Click' />);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });
  test('apply custom className if user give it', () => {
    render(<Button text='Click' className='className' />);
    expect(screen.getByRole('button')).toHaveClass('className');
  });
  test('handle click event', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button text='Click' onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  test('passes down other props', () => {
    render(<Button text='Click' disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
