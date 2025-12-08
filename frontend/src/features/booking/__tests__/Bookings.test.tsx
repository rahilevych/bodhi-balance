import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Bookings } from '../components/bookings/Bookings';

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
