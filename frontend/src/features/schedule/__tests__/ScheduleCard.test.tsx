import { render, screen, fireEvent } from '@testing-library/react';
import { Training } from '../../../types/Types';
import { useProfile } from '../../auth/hooks/useProfile';
import { ScheduleCard } from '../components/schedule-card/ScheduleCard';

jest.mock('../../auth/hooks/useProfile');

describe('ScheduleCard', () => {
  const mockOnClick = jest.fn();

  const baseTraining: Training = {
    _id: '1',
    datetime: new Date(Date.now() + 3600 * 1000),
    duration: 60,
    spots_taken: 0,
    spots_total: 5,
    trainer_id: {
      _id: 't1',
      fullName: 'Smith',
      photo: '',
      about: 'About',
      experience: 5,
      specialization: 'Yoga',
    },
    yogaStyle_id: {
      _id: 'y1',
      title: 'Hatha',
      image: '',
      description: 'Desc',
      trainer: 'Smith',
      duration: 60,
    },
    type: 'training',
    price: 20,
    priceId: 'price_123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useProfile as jest.Mock).mockReturnValue({ data: { bookings: [] } });
  });

  test('shows Book button when spots available and not booked', () => {
    render(<ScheduleCard item={baseTraining} onClick={mockOnClick} />);
    const bookBtn = screen.getByText('Book');
    expect(bookBtn).toBeInTheDocument();

    fireEvent.click(bookBtn);
    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  test('shows Already booked if user already booked', () => {
    (useProfile as jest.Mock).mockReturnValue({
      data: {
        bookings: [{ training: { _id: '1' }, status: 'booked' }],
      },
    });

    render(<ScheduleCard item={baseTraining} onClick={mockOnClick} />);
    expect(screen.getByText('Already booked')).toBeInTheDocument();
  });

  test('shows Booking closed if spots are full', () => {
    const fullTraining = { ...baseTraining, spots_taken: 5 };
    render(<ScheduleCard item={fullTraining} onClick={mockOnClick} />);
    expect(screen.getByText('Booking closed')).toBeInTheDocument();
  });

  test('shows Booking closed if datetime is past', () => {
    const pastTraining = {
      ...baseTraining,
      datetime: new Date(Date.now() - 3600 * 1000),
    };
    render(<ScheduleCard item={pastTraining} onClick={mockOnClick} />);
    expect(screen.getByText('Booking closed')).toBeInTheDocument();
  });
});
