import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BookingsCard } from '../components/booking-card/BookingsCard';
import { convertDateToString } from '../../../utils/dateHelpers';

const mutateMock = jest.fn();

jest.mock('../hooks/useCancelBooking', () => ({
  useCancelBooking: jest.fn(() => ({
    mutate: mutateMock,
    isPending: false,
  })),
}));

describe('BookingsCard', () => {
  const bookingsMockData = [
    {
      _id: 'booking1',
      user: 'user1',
      date: new Date('2024-06-10T10:00:00Z'),
      status: 'booked',
      training: {
        _id: 'training1',
        datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        duration: 60,
        spots_taken: 5,
        spots_total: 10,
        trainer_id: {
          _id: 'trainer1',
          fullName: 'Anna Ivanova',
          experience: 5,
          specialization: 'Hatha Yoga',
          about: 'Experienced Hatha yoga trainer',
          photo: 'https://example.com/photos/anna.jpg',
        },
        yogaStyle_id: {
          _id: 'style1',
          title: 'Hatha',
          image: 'https://example.com/images/hatha.jpg',
          duration: 60,
          trainer: 'trainer1',
          description: 'Gentle and slow yoga style',
        },
        type: 'group',
        price: 15,
        priceId: 'price_001',
      },
    },
    {
      _id: 'booking2',
      user: 'user1',
      date: new Date('2024-05-01T12:00:00Z'),
      status: 'completed',
      training: {
        _id: 'training2',
        datetime: new Date('2024-05-01T12:00:00Z'),
        duration: 45,
        spots_taken: 10,
        spots_total: 10,
        trainer_id: {
          _id: 'trainer2',
          fullName: 'Ivan Petrov',
          experience: 10,
          specialization: 'Vinyasa Yoga',
          about: 'Expert in dynamic Vinyasa flow',
          photo: 'https://example.com/photos/ivan.jpg',
        },
        yogaStyle_id: {
          _id: 'style2',
          title: 'Vinyasa',
          image: 'https://example.com/images/vinyasa.jpg',
          duration: 45,
          trainer: 'trainer2',
          description: 'Dynamic and flowing yoga style',
        },
        type: 'private',
        price: 25,
        priceId: 'price_002',
      },
    },
    {
      _id: 'booking3',
      user: 'user1',
      date: new Date('2024-04-01T09:00:00Z'),
      status: 'cancelled',
      training: {
        _id: 'training3',
        datetime: new Date('2024-04-10T09:00:00Z'),
        duration: 60,
        spots_taken: 3,
        spots_total: 15,
        trainer_id: {
          _id: 'trainer3',
          fullName: 'Elena Smirnova',
          experience: 7,
          specialization: 'Ashtanga Yoga',
          about: 'Passionate Ashtanga teacher',
          photo: 'https://example.com/photos/elena.jpg',
        },
        yogaStyle_id: {
          _id: 'style3',
          title: 'Ashtanga',
          image: 'https://example.com/images/ashtanga.jpg',
          duration: 60,
          trainer: 'trainer3',
          description: 'Powerful and disciplined yoga style',
        },
        type: 'group',
        price: 20,
        priceId: 'price_003',
      },
    },
  ];
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
