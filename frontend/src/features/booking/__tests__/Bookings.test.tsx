import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Bookings } from '../components/bookings/Bookings';
import { bookingsMockData } from '../../../__mocks__/bookingsMock';
import { useGetBookingsByUser } from '../hooks/useGetBookingByUser';
import { useCancelBooking } from '../hooks/useCancelBooking';
import { useAppContext } from '../../../context/AppContext';

const mutateMock = jest.fn();

jest.mock('../hooks/useGetBookingByUser', () => ({
  useGetBookingsByUser: jest.fn(),
}));

jest.mock('../hooks/useCancelBooking', () => ({
  useCancelBooking: jest.fn(),
}));

jest.mock('../../../context/AppContext.tsx', () => ({
  useAppContext: jest.fn(),
}));

describe('Bookings', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetBookingsByUser as jest.Mock).mockReturnValue({
      data: bookingsMockData,
      isPending: false,
    });

    (useCancelBooking as jest.Mock).mockReturnValue({
      mutate: mutateMock,
    });

    (useAppContext as jest.Mock).mockReturnValue({
      isMobile: false,
    });
  });

  test('renders filter tabs', () => {
    render(<Bookings />);
    expect(screen.getByText(/upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/cancelled/i)).toBeInTheDocument();
  });

  test('renders table headers', () => {
    render(<Bookings />);
    [
      '№',
      'Training',
      'Booking date',
      'Training date',
      'Status',
      'Cancellation',
    ].forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
  });

  test('renders correct rows for upcoming bookings', () => {
    render(<Bookings />);
    const rows = screen.getAllByRole('row').slice(1);
    const upcomingBookings = bookingsMockData.filter(
      (b) => b.status === 'booked',
    );
    expect(rows.length).toBe(upcomingBookings.length);
    rows.forEach((row) => expect(row).toHaveTextContent(/booked/i));
  });

  test('renders correct rows for completed bookings', async () => {
    render(<Bookings />);
    await user.click(screen.getByText(/completed/i));
    const rows = screen.getAllByRole('row').slice(1);
    const completedBookings = bookingsMockData.filter(
      (b) => b.status === 'completed',
    );
    expect(rows.length).toBe(completedBookings.length);
    rows.forEach((row) => expect(row).toHaveTextContent(/completed/i));
  });

  test('renders correct rows for cancelled bookings', async () => {
    render(<Bookings />);
    await user.click(screen.getByText(/cancelled/i));
    const rows = screen.getAllByRole('row').slice(1);
    const cancelledBookings = bookingsMockData.filter(
      (b) => b.status === 'cancelled',
    );
    expect(rows.length).toBe(cancelledBookings.length);
    rows.forEach((row) => expect(row).toHaveTextContent(/cancelled/i));
  });

  test('renders empty state if no bookings', () => {
    (useGetBookingsByUser as jest.Mock).mockReturnValue({
      data: [],
      isPending: false,
    });
    render(<Bookings />);
    expect(screen.getByText(/No bookings found/i)).toBeInTheDocument();
  });

  test('opens and confirms cancellation', async () => {
    render(<Bookings />);
    const cancelBtn = screen.getAllByRole('button', { name: /cancel/i })[0];
    await user.click(cancelBtn);
    expect(
      await screen.findByText(/Are you sure you want to cancel/i),
    ).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: /yes/i });
    await user.click(confirmBtn);

    const bookingId = bookingsMockData[0]._id;
    const trainingId = bookingsMockData[0].training._id;
    expect(mutateMock).toHaveBeenCalledWith({ bookingId, trainingId });
  });

  test('cancellation modal can be canceled', async () => {
    render(<Bookings />);
    const cancelBtn = screen.getAllByRole('button', { name: /cancel/i })[0];
    await user.click(cancelBtn);

    const modal = screen.getByTestId('confirm-window');
    const cancelModalBtn = within(modal).getByRole('button', {
      name: /cancel/i,
    });
    await user.click(cancelModalBtn);

    expect(mutateMock).not.toHaveBeenCalled();
  });
  test('renders mobile view with BookingsCard', () => {
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Bookings />);
    expect(
      screen.getByText(bookingsMockData[0].training.yogaStyle_id.title),
    ).toBeInTheDocument();
  });
});
