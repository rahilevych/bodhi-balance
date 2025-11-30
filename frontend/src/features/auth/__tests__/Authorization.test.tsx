import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Authorization } from '../components/Authorization';
import '@testing-library/jest-dom';
jest.mock('../../services/authService', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));
jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({
    setUser: jest.fn(),
    setIsAuthenticated: jest.fn(),
    setNotification: jest.fn(),
  }),
}));
describe('Authorization component', () => {
  test('renders Sign in form by default', () => {
    render(<Authorization />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Sign in',
    );
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });
  test('switches to Sign up form when clicking "Sign up" link', async () => {
    render(<Authorization />);
    const signUpLink = screen.getByText(/Sign up/i);
    await userEvent.click(signUpLink);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Sign up',
    );
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i }),
    ).toBeInTheDocument();
  });
  test('switches back to Sign in form when clicking "Sign in" link in Sign up form', async () => {
    render(<Authorization />);
    const signUpLink = screen.getByText(/Sign up/i);
    await userEvent.click(signUpLink);

    const signInLink = screen.getByText(/Sign in/i);
    await userEvent.click(signInLink);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Sign in',
    );
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });
});
