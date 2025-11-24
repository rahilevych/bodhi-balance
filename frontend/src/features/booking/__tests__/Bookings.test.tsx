import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Bookings } from '../components/bookings/Bookings';
import { useFetchData } from '../../../hooks/useFetchData';
import { bookingsMockData } from '../../../__mocks__/bookingsMock';
import { cancelBooking } from '../../../services/bookingsService';

jest.mock('../../services/bookingsService', () => ({
  cancelBooking: jest.fn(),
  getBookingsByUserId: jest.fn(),
}));
jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({
    setNotification: jest.fn(),
    color: '#000',
  }),
}));
jest.mock('react-spinners', () => ({
  BounceLoader: ({ loading }: { loading: boolean }) =>
    loading ? <div data-testid='loader'>Loading...</div> : null,
}));
jest.mock('../../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));
jest.mock('../../services/authService', () => ({
  getMe: jest.fn(),
}));

describe('Bookings', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchData as jest.Mock).mockReturnValue({
      data: bookingsMockData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });
  });
  test('renders correct filter sections', () => {
    render(<Bookings />);
    expect(screen.getByText(/upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/cancelled/i)).toBeInTheDocument();
  });
  test('renders correct table headers', () => {
    render(<Bookings />);
    expect(screen.getByText('№')).toBeInTheDocument();
    expect(screen.getByText('Training')).toBeInTheDocument();
    expect(screen.getByText('Booking date')).toBeInTheDocument();
    expect(screen.getByText('Training date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Cancellation')).toBeInTheDocument();
  });
  test('renders correct amount of rows for activeTab "upcoming" ', () => {
    const upcomingBookings = bookingsMockData.filter(
      (b) => b.status === 'booked',
    );
    render(<Bookings />);
    expect(screen.getByText(/upcoming/i)).toHaveClass('active');
    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(upcomingBookings.length);
  });
  test('renders correct amount of rows for activeTab "completed" ', async () => {
    const upcomingBookings = bookingsMockData.filter(
      (b) => b.status === 'completed',
    );
    render(<Bookings />);
    await user.click(screen.getByText(/completed/i));
    expect(screen.getByText('Completed')).toHaveClass('active');
    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(upcomingBookings.length);
  });
  test('renders correct amount of rows for activeTab "cancelled" ', async () => {
    const upcomingBookings = bookingsMockData.filter(
      (b) => b.status === 'cancelled',
    );
    render(<Bookings />);
    await user.click(screen.getByText(/cancelled/i));
    expect(screen.getByText('Cancelled')).toHaveClass('active');
    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(upcomingBookings.length);
  });

  test('renders correct amount of rows for activeTab "cancelled" ', async () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: new Error(),
      refetch: jest.fn(),
    });
    render(<Bookings />);

    expect(
      screen.getByText(/Something went wrong. Please try again later/i),
    ).toBeInTheDocument();
  });
  test('renders correct amount of rows for activeTab "cancelled" ', async () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });
    render(<Bookings />);

    expect(
      screen.getByText(/You haven't made any bookings yet./i),
    ).toBeInTheDocument();
  });
  test('cancels booking if user clicked canceled btn and confirm it ', async () => {
    (cancelBooking as jest.Mock).mockReturnValue({ undefined });
    render(<Bookings />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    expect(cancelBtn).toBeInTheDocument();
    await user.click(cancelBtn);
    expect(
      screen.getByText(/Are you sure you want to cancel?/i),
    ).toBeInTheDocument();
    const confirmButton = screen.getByRole('button', { name: /yes/i });
    await user.click(confirmButton);
    expect(cancelBooking).toHaveBeenCalledWith('booking1', 'training1');
  });
  test('doesnt cancel booking if user clicked canceled btn but didnt confirm it ', async () => {
    (cancelBooking as jest.Mock).mockReturnValue({ undefined });
    render(<Bookings />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    expect(cancelBtn).toBeInTheDocument();
    await user.click(cancelBtn);
    const confirmationWindow = screen.getByTestId('confirm-window');
    expect(
      screen.getByText(/Are you sure you want to cancel?/i),
    ).toBeInTheDocument();
    const cancelButton = within(confirmationWindow).getByRole('button', {
      name: /cancel/i,
    });
    await user.click(cancelButton);
    expect(cancelBooking).not.toHaveBeenCalledWith('booking1', 'training1');
  });
});
