import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { useProfile } from '../../auth/hooks/useProfile';
import { useAppContext } from '../../../context/AppContext';
import ScheduleTable from '../components/schedule-table/ScheduleTable';
import { Training } from '../../../types/Types';

jest.mock('../../auth/hooks/useProfile');
jest.mock('../../../context/AppContext');

describe('ScheduleTable', () => {
  const trainingsMock: Training[] = [
    {
      _id: 't1',
      datetime: new Date(Date.now() + 3600 * 1000),
      duration: 60,
      spots_taken: 0,
      spots_total: 10,
      trainer_id: {
        _id: 'tr1',
        fullName: 'John Doe',
        photo: '',
        about: 'Experienced trainer',
        specialization: 'Hatha',
        experience: 5,
      },
      yogaStyle_id: {
        _id: 'y1',
        title: 'Hatha Yoga',
        description: 'Relaxing yoga',
        duration: 60,
        trainer: 'Smith',
        image: '',
      },
      type: 'training',
      price: 15,
      priceId: 'price_1',
    },
    {
      _id: 't2',
      datetime: new Date(Date.now() - 3600 * 1000),
      duration: 45,
      spots_taken: 10,
      spots_total: 10,
      trainer_id: {
        _id: 'tr2',
        fullName: 'Jane Smith',
        photo: '',
        about: 'Expert trainer',
        specialization: 'Vinyasa',
        experience: 3,
      },
      yogaStyle_id: {
        _id: 'y2',
        title: 'Vinyasa Yoga',
        description: 'Energetic flow',
        trainer: 'Smith',
        duration: 45,
        image: '',
      },
      type: 'training',
      price: 20,
      priceId: 'price_2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders trainings in desktop table', () => {
    (useProfile as jest.Mock).mockReturnValue({ data: { bookings: [] } });
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });

    render(
      <BrowserRouter>
        <ScheduleTable trainings={trainingsMock} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Hatha Yoga')).toBeInTheDocument();
    expect(screen.getByText('Vinyasa Yoga')).toBeInTheDocument();
    expect(screen.getAllByText('Book')[0]).toBeInTheDocument();
    expect(screen.getByText('Booking closed')).toBeInTheDocument();
  });

  test('renders trainings in mobile cards view', () => {
    (useProfile as jest.Mock).mockReturnValue({ data: { bookings: [] } });
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: true });

    render(
      <BrowserRouter>
        <ScheduleTable trainings={trainingsMock} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Hatha Yoga')).toBeInTheDocument();
    expect(screen.getByText('Vinyasa Yoga')).toBeInTheDocument();
  });

  test('shows Already booked if user has booking', () => {
    (useProfile as jest.Mock).mockReturnValue({
      data: {
        bookings: [
          {
            status: 'booked',
            training: { _id: 't1' },
          },
        ],
      },
    });
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });

    render(
      <BrowserRouter>
        <ScheduleTable trainings={trainingsMock} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Already booked')).toBeInTheDocument();
  });

  test('clicking Book button navigates to detailed page', async () => {
    (useProfile as jest.Mock).mockReturnValue({ data: { bookings: [] } });
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });

    const mockNavigate = jest.fn();
    jest.mock('react-router', () => ({
      ...jest.requireActual('react-router'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <ScheduleTable trainings={trainingsMock} />
      </BrowserRouter>,
    );

    const bookBtn = screen.getAllByText('Book')[0];
    await userEvent.click(bookBtn);
  });
});
