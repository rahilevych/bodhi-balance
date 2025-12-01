import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { useRegistration } from '../hooks/useRegistration';

const mutateMock = jest.fn();
const navigateMock = jest.fn();
jest.mock('../hooks/useRegistration.ts', () => ({
  useRegistration: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => navigateMock,
}));

describe('RegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form inputs and button', () => {
    render(<RegistrationForm />);
    const textInputs = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(textInputs).toHaveLength(2);
    expect(passwordInput).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    render(<RegistrationForm />);
    const button = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(button);
    expect(await screen.findByText('Name is required!')).toBeInTheDocument();
    expect(await screen.findByText('Email is required!')).toBeInTheDocument();
    expect(
      await screen.findByText('Password must be at least 6 characters long'),
    ).toBeInTheDocument();
  });
  test('shows error for invalid email format', async () => {
    render(<RegistrationForm />);
    await userEvent.type(
      screen.getByPlaceholderText(/full name/i),
      'Adam Smith',
    );
    await userEvent.type(screen.getByPlaceholderText(/email/i), ' smith');
    await userEvent.type(screen.getByPlaceholderText(/password/i), ' 111111');
    const button = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/Invalid email format/i),
    ).toBeInTheDocument();
  });
  test('shows error for invalid password format', async () => {
    render(<RegistrationForm />);
    await userEvent.type(
      screen.getByPlaceholderText(/full name/i),
      'Adam Smith',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      ' smith@gmail.com',
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), ' 1111');
    const button = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/Password must be at least 6 characters long/i),
    ).toBeInTheDocument();
  });
  test('calls mutate and navigate on valid submit', async () => {
    (useRegistration as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });
    render(<RegistrationForm />);
    await userEvent.type(
      screen.getByPlaceholderText(/full name/i),
      'Adam Smith',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'smith@gmail.com',
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), '111111');
    const button = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        fullName: 'Adam Smith',
        email: 'smith@gmail.com',
        password: '111111',
      });
    });
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('renders Loader when isPending is true', () => {
    (useRegistration as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<RegistrationForm />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
