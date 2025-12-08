import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCreateCheckoutSession } from '../../payment/hooks/useCreateCheckoutSession';
import { useGetTrainingById } from '../hooks/useGetTrainingById';
import { TrainingDetailed } from '../components/training-detailed/TrainingDetailed';

jest.mock('../hooks/useGetTrainingById');
jest.mock('../../payment/hooks/useCreateCheckoutSession');

describe('TrainingDetailed', () => {
  const mockStartCheckout = jest.fn();

  const trainingMock = {
    _id: 't1',
    price: 25,
    duration: 60,
    datetime: '2025-01-10T10:00:00Z',
    yogaStyle_id: {
      title: 'Hatha Yoga',
      description: 'Relaxing yoga session.',
      image: 'style-img.jpg',
    },
    trainer_id: {
      fullName: 'John Doe',
      about: 'Experienced trainer',
      experience: 5,
      specialization: 'Flexibility',
      photo: 'trainer-photo.jpg',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useCreateCheckoutSession as jest.Mock).mockReturnValue({
      mutate: mockStartCheckout,
    });
  });

  test('renders loading state', () => {
    (useGetTrainingById as jest.Mock).mockReturnValue({
      data: null,
      isPending: true,
    });

    render(<TrainingDetailed id='t1' />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('does not render if training is null', () => {
    (useGetTrainingById as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
    });

    const { container } = render(<TrainingDetailed id='t1' />);

    expect(container.firstChild).toBeNull();
  });

  test('renders training information', () => {
    (useGetTrainingById as jest.Mock).mockReturnValue({
      data: trainingMock,
      isPending: false,
    });

    render(<TrainingDetailed id='t1' />);

    expect(screen.getByText('Hatha Yoga')).toBeInTheDocument();
    expect(screen.getByText('Relaxing yoga session.')).toBeInTheDocument();
    expect(screen.getByText(/Price:/i)).toBeInTheDocument();
    expect(screen.getByText('25 $')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  test('calls startCheckout when "Book" button is clicked', async () => {
    (useGetTrainingById as jest.Mock).mockReturnValue({
      data: trainingMock,
      isPending: false,
    });

    render(<TrainingDetailed id='t1' />);

    const bookBtn = screen.getByRole('button', { name: /book/i });

    await userEvent.click(bookBtn);

    expect(mockStartCheckout).toHaveBeenCalledTimes(1);
    expect(mockStartCheckout).toHaveBeenCalledWith({
      productId: 't1',
      type: 'training',
    });
  });
});
