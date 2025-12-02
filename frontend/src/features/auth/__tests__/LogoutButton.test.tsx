import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import LogoutButton from '../ui/logout-btn/LogoutButton';
import { useLogout } from '../hooks/useLogout';

const mutateMock = jest.fn();

jest.mock('../hooks/useLogout', () => ({
  useLogout: jest.fn(() => ({
    mutate: mutateMock,
    isPending: false,
  })),
}));

describe('LogoutButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders button', () => {
    render(<LogoutButton />);
    expect(
      screen.getByRole('button', { name: /log out/i }),
    ).toBeInTheDocument();
  });

  test('shows loader when isPending is true', () => {
    (useLogout as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
    });
    render(<LogoutButton />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  test('opens confirmation modal on button click', async () => {
    (useLogout as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    render(<LogoutButton />);
    const btn = screen.getByText(/log out/i);
    await userEvent.click(btn);

    expect(
      screen.getByText(/are you sure you want to log out\?/i),
    ).toBeInTheDocument();
  });

  test('calls logout on confirm', async () => {
    render(<LogoutButton />);
    await userEvent.click(screen.getByText(/log out/i));
    await userEvent.click(screen.getByText(/yes/i));
    expect(mutateMock).toHaveBeenCalled();
  });

  test('closes modal on cancel', async () => {
    render(<LogoutButton />);
    await userEvent.click(screen.getByText(/log out/i));
    await userEvent.click(screen.getByText(/cancel/i));
    expect(
      screen.queryByText(/are you sure you want to log out?/i),
    ).not.toBeInTheDocument();
  });
});
