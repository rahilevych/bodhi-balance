import { render, within, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BookingsCard } from '../components/booking-card/BookingsCard';
import { bookingsMockData } from '../../../__mocks__/bookingsMock';
import { convertDateToString } from '../../../utils/dateHelpers';
import { cancelBooking } from '../../../services/bookingsService';

jest.mock('../../services/bookingsService', () => ({
  cancelBooking: jest.fn(),
}));

describe('BookingsCard', () => {
  const booking = bookingsMockData[0];
  const handleCancel = jest.fn();
  const user = userEvent.setup();

  test('renders correctly BookingCard with data', () => {
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

  test('cancels booking if user clicked canceled btn and confirm it ', async () => {
    (cancelBooking as jest.Mock).mockReturnValue({ undefined });
    render(<BookingsCard booking={booking} handleCancel={handleCancel} />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    expect(cancelBtn).toBeInTheDocument;
    await user.click(cancelBtn);
    expect(
      screen.getByText(/Are you sure you want to cancel?/i),
    ).toBeInTheDocument();
    const confirmButton = screen.getByRole('button', { name: /yes/i });
    await user.click(confirmButton);
    expect(handleCancel).toHaveBeenCalledWith('booking1', 'training1');
  });
  test('doesnt cancel booking if user clicked canceled btn but didnt confirm it ', async () => {
    (cancelBooking as jest.Mock).mockReturnValue({ undefined });
    render(<BookingsCard booking={booking} handleCancel={handleCancel} />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    expect(cancelBtn).toBeInTheDocument;
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
