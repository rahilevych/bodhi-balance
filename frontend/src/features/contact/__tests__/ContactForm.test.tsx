import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../components/contact-form/ContactForm';
import { toast } from 'react-toastify';

const mutateMock = jest.fn();

jest.mock('../hooks/useSendMessage.ts', () => ({
  useSendMessage: jest.fn(() => ({
    mutate: mutateMock,
    isPending: false,
  })),
}));

jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all input fields and submit button', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const button = screen.getByRole('button', { name: /send/i });

    await user.click(button);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  test('shows error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText(/full name/i), 'User');
    await user.type(screen.getByPlaceholderText(/email/i), 'invalid-email');
    await user.type(screen.getByPlaceholderText(/message/i), 'Test message');

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(
      await screen.findByText(/invalid email format/i),
    ).toBeInTheDocument();
  });

  test('calls mutate on valid form submission and triggers onSuccess', async () => {
    mutateMock.mockImplementation((data, options) => {
      options?.onSuccess?.();
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText(/full name/i), 'User');
    await user.type(screen.getByPlaceholderText(/email/i), 'user@gmail.com');
    await user.type(screen.getByPlaceholderText(/message/i), 'Hello!');

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(mutateMock).toHaveBeenCalledWith({
      fullName: 'User',
      email: 'user@gmail.com',
      message: 'Hello!',
    });
  });

  test('calls mutate on valid form submission and triggers onError', async () => {
    mutateMock.mockImplementation(() => {
      toast.error('Try later, smth went wrong!');
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText(/full name/i), 'User');
    await user.type(screen.getByPlaceholderText(/email/i), 'user@gmail.com');
    await user.type(screen.getByPlaceholderText(/message/i), 'Hello!');

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Try later, smth went wrong!');
    });
  });
});
