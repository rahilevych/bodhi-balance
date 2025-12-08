/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { Trainer } from '../../../types/Types';
import { useGetTrainers } from '../hooks/useGetTrainers';
import Trainers from '../components/trainers/Trainers';
import { useAppContext } from '../../../context/AppContext';

jest.mock('../components/full-card/FullCard', () => ({
  FullCard: ({ currentTrainer }: { currentTrainer: Trainer }) => (
    <div data-testid='full-card'>{currentTrainer.fullName}</div>
  ),
}));

jest.mock('../../../shared/ui/slider-card/SliderCard.tsx', () => ({
  SliderCard: ({ title }: { title: string }) => (
    <div data-testid='slider-card'>{title}</div>
  ),
}));

jest.mock('../../../shared/ui/slider/Slider', () => ({
  Slider: ({ items, onSlideChange, renderItem }: any) => (
    <div>
      {items.map((i: any, index: number) => (
        <div
          key={i.fullName}
          data-testid='slider-item'
          onClick={() => onSlideChange(index)}
        >
          {renderItem(i)}
        </div>
      ))}
    </div>
  ),
}));

jest.mock(
  '../../yoga-directions/components/yoga-styles/YogaStylesSkeleton',
  () => ({
    YogaStylesSkeleton: () => <div data-testid='skeleton' />,
  }),
);

jest.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: jest.fn(), inView: true }),
}));

jest.mock('react-scroll', () => ({
  Element: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../hooks/useGetTrainers');
jest.mock('../../../context/AppContext.tsx');

const trainersMock = [
  { fullName: 'John Doe', photo: '/john.jpg' },
  { fullName: 'Anna Smith', photo: '/anna.jpg' },
];

describe('Trainers component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders skeleton while loading', () => {
    (useGetTrainers as jest.Mock).mockReturnValue({
      data: [],
      isPending: true,
    });
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });

    render(<Trainers />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('renders trainers after data is loaded', () => {
    (useGetTrainers as jest.Mock).mockReturnValue({
      data: trainersMock,
      isPending: false,
    });

    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });

    render(<Trainers />);

    expect(screen.getByText(/Trainers/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('slider-card')).toHaveLength(2);
    expect(screen.getByTestId('full-card')).toHaveTextContent('John Doe'); // currentTrainer = 0
  });

  test('changes current trainer when slider item is clicked', () => {
    (useGetTrainers as jest.Mock).mockReturnValue({
      data: trainersMock,
      isPending: false,
    });

    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });

    render(<Trainers />);

    const items = screen.getAllByTestId('slider-item');

    fireEvent.click(items[1]);

    expect(screen.getByTestId('full-card')).toHaveTextContent('Anna Smith');
  });

  test('renders FullCard inside slider in mobile mode', () => {
    (useGetTrainers as jest.Mock).mockReturnValue({
      data: trainersMock,
      isPending: false,
    });

    (useAppContext as jest.Mock).mockReturnValue({ isMobile: true });

    render(<Trainers />);

    expect(screen.getAllByTestId('full-card')).toHaveLength(2);
  });
});
