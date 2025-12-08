import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from '../button/Button';

describe('Button', () => {
  test('renders button with given text', () => {
    render(<Button>Click</Button>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });
  test('apply custom className if user give it', () => {
    render(<Button className='className'>Click</Button>);

    expect(screen.getByRole('button')).toHaveClass('className');
  });
  test('handle click event', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  test('passes down other props', () => {
    render(
      <Button className='className' disabled>
        Click
      </Button>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
