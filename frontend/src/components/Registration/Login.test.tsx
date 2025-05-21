import { render, screen, waitFor } from '@testing-library/react';
import { useAppContext } from '../../context/AppContext';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import '@testing-library/jest-dom';
import { loginUser } from '../../services/authService';

const setNotificationMock = jest.fn();
const setUserMock = jest.fn();
const setIsAuthenticatedMock = jest.fn();

jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({
    setUser: setUserMock,
    setIsAuthenticated: setIsAuthenticatedMock,
    setNotification: setNotificationMock,
  }),
}));

jest.mock('../../services/authService.ts', () => ({
  loginUser: jest.fn(),
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
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    expect(await screen.findByText('Email is required!')).toBeInTheDocument();
    expect(
      await screen.findByText('Password must be at least 6 characters long')
    ).toBeInTheDocument();
  });
  test('shows error for invalid email format', async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText(/email/i), ' smith');
    await userEvent.type(screen.getByPlaceholderText(/password/i), ' 111111');
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/Invalid email format/i)
    ).toBeInTheDocument();
  });
  test('shows error for invalid password format', async () => {
    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      ' smith@gmail.com'
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), ' 1111');
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/Password must be at least 6 characters long/i)
    ).toBeInTheDocument();
  });
  test('calls loginUser from service and show that login was successful', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      _id: 'user123',
      email: 'smith@gmail.com',
      name: 'Adam Smith',
      role: 'user',
      createdAt: new Date(),
    });
    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'smith@gmail.com'
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), '111111');
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'smith@gmail.com',
        password: '111111',
      });
    });
    expect(setNotificationMock).toHaveBeenCalledWith('Successfully logged in!');
  });
  test('shows error message when login failed', async () => {
    const error = {
      response: { data: { error: 'Invalid credentials' } },
    };
    (loginUser as jest.Mock).mockRejectedValueOnce(error);
    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'smith@gmail.com'
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), '111111');
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'smith@gmail.com',
        password: '111111',
      });
    });
    expect(setNotificationMock).toHaveBeenCalledWith('Login failed!');
  });

  test('shows unknown error message on unexpected error', async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'smith@gmail.com'
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), '111111');
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'smith@gmail.com',
        password: '111111',
      });
    });
    expect(await screen.findByText('Unknown error')).toBeInTheDocument();
    expect(setNotificationMock).toHaveBeenCalledWith('Login failed!');
  });
});
