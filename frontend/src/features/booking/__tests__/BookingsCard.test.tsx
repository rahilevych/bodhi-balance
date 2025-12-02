import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BookingsCard } from '../components/booking-card/BookingsCard';
import { bookingsMockData } from '../../../__mocks__/bookingsMock';
import { convertDateToString } from '../../../utils/dateHelpers';

const mutateMock = jest.fn();

jest.mock('../hooks/useCancelBooking', () => ({
  useCancelBooking: jest.fn(() => ({
    mutate: mutateMock,
    isPending: false,
  })),
}));

describe('BookingsCard', () => {
  const booking = bookingsMockData[0];
  booking.training.datetime = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const handleCancel = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders BookingCard with correct data', () => {
    render(<BookingsCard booking={booking} handleCancel={handleCancel} />);
    expect(
      screen.getByText(booking.training.yogaStyle_id.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(convertDateToString(booking.date)),
    ).toBeInTheDocument();
    expect(screen.getByText(booking.status)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('opens confirmation modal on cancel button click', async () => {
    render(<BookingsCard booking={booking} handleCancel={handleCancel} />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelBtn);

    expect(
      screen.getByText(/are you sure you want to cancel\?/i),
    ).toBeInTheDocument();
  });

  test('calls handleCancel when user confirms cancellation', async () => {
    render(<BookingsCard booking={booking} handleCancel={handleCancel} />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelBtn);
    const confirmBtn = screen.getByRole('button', { name: /yes/i });
    await user.click(confirmBtn);
    expect(handleCancel).toHaveBeenCalledWith(
      booking._id,
      booking.training._id,
    );
  });

  test('does not call handleCancel when user cancels in modal', async () => {
    render(<BookingsCard booking={booking} handleCancel={handleCancel} />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelBtn);
    const confirmationWindow = screen.getByTestId('confirm-window');
    const cancelModalBtn = within(confirmationWindow).getByRole('button', {
      name: /cancel/i,
    });
    await user.click(cancelModalBtn);
    expect(handleCancel).not.toHaveBeenCalled();
  });
  test("doesn't show cancel button if training is less than 24h away", () => {
    const bookingSoon = { ...booking };
    bookingSoon.training.datetime = new Date(Date.now() - 48 * 60 * 60 * 1000);
    render(<BookingsCard booking={bookingSoon} handleCancel={handleCancel} />);
    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/cancellation isn't availiable/i),
    ).toBeInTheDocument();
  });
});
