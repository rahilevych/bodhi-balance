import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LoginForm } from '../components/login/LoginForm';
import { useLogin } from '../hooks/useLogin';

const mutateMock = jest.fn();
const navigateMock = jest.fn();
jest.mock('../hooks/useLogin', () => ({
  useLogin: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => navigateMock,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form inputs and button', () => {
    render(<LoginForm />);
    const textInputs = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(textInputs).toHaveLength(1);
    expect(passwordInput).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    expect(await screen.findByText('Email is required!')).toBeInTheDocument();
    expect(
      await screen.findByText('Password must be at least 6 characters long'),
    ).toBeInTheDocument();
  });

  test('shows error for invalid email format', async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByPlaceholderText(/email/i), ' smith');
    await userEvent.type(screen.getByPlaceholderText(/password/i), ' 111111');
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/Invalid email format/i),
    ).toBeInTheDocument();
  });

  test('shows error for invalid password format', async () => {
    render(<LoginForm />);
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      ' smith@gmail.com',
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), ' 1111');
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/Password must be at least 6 characters long/i),
    ).toBeInTheDocument();
  });

  test('calls mutate and navigate on valid submit', async () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });
    render(<LoginForm />);
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'test@mail.com',
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        email: 'test@mail.com',
        password: '123456',
      });
    });

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('renders Loader when isPending is true', () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<LoginForm />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
