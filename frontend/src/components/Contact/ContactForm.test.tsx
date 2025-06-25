import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';
import { sendMessage } from '../../services/contactService';

const setNotificationMock = jest.fn();

jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({
    setNotification: setNotificationMock,
  }),
}));

jest.mock('../../services/contactService.ts', () => ({
  sendMessage: jest.fn(),
}));

describe('Contact Form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render form with two inputs, one textarea  and button', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
  test('show validation errors on empty  submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const button = screen.getByRole('button', { name: /send/i });
    await user.click(button);
    expect(await screen.findByText('Name ist required!')).toBeInTheDocument();
    expect(await screen.findByText('Email is required!')).toBeInTheDocument();
    expect(await screen.findByText('Message is required!')).toBeInTheDocument();
  });
  test('shows error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByPlaceholderText(/email/i), ' email');
    await user.type(screen.getByPlaceholderText(/full name/i), ' user');
    await user.type(screen.getByPlaceholderText(/message/i), ' message');
    const button = screen.getByRole('button', { name: /send/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/Invalid email format!/i)
    ).toBeInTheDocument();
  });

  test('calls sendMessage from service and show that it was successful', async () => {
    (sendMessage as jest.Mock).mockResolvedValueOnce({
      fullName: 'user',
      email: 'email@gmail.com',
      message: 'test',
    });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText(/email/i), 'email@gmail.com');
    await user.type(screen.getByPlaceholderText(/full name/i), 'user');
    await user.type(screen.getByPlaceholderText(/message/i), 'test');
    const button = screen.getByRole('button', { name: /send/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith({
        fullName: 'user',
        email: 'email@gmail.com',
        message: 'test',
      });
    });
    expect(setNotificationMock).toHaveBeenCalledWith(
      'Message sent successfully,we will contact you as soon as possible!'
    );
  });

  test('shows error message when sending message failed', async () => {
    (sendMessage as jest.Mock).mockRejectedValueOnce(new Error('Server error'));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText(/email/i), 'email@gmail.com');
    await user.type(screen.getByPlaceholderText(/full name/i), 'user');
    await user.type(screen.getByPlaceholderText(/message/i), 'test');
    const button = screen.getByRole('button', { name: /send/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith({
        fullName: 'user',
        email: 'email@gmail.com',
        message: 'test',
      });

      expect(setNotificationMock).toHaveBeenCalledWith(
        'Try later, smth went wrong!'
      );
    });
  });
});
