import { render, screen } from '@testing-library/react';
import { Pricing } from './Pricing';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
const plans = [
  {
    type: 'pack',
    title: '5-Class pack',
    price: 100,
    description: 'Flexible schedules or occasional visitors',
    priceId: 'price_1RaDrbHCX17lsTRpRlbNr3y4',
    trainingsCoiunt: 5,
  },
  {
    type: 'pack',
    title: '10-Class pack',
    price: 220,
    description: 'Flexible schedules or occasional visitors',
    priceId: 'price_1RaDrxHCX17lsTRpida8URQV',
    trainingsCoiunt: 10,
  },
  {
    type: 'unlimited',
    title: '3 months',
    price: 300,
    description: 'Includes weekly sessions and progress tracking.',
    priceId: 'price_1RaDkUHCX17lsTRpcsc0qhd2',
    trainingsCoiunt: 3,
  },
  {
    type: 'unlimited',
    title: '6 months',
    price: 600,
    description: 'Better value for long-term learners.',
    priceId: 'price_1RaDkUHCX17lsTRpcsc0qhd2',
    trainingsCoiunt: 6,
  },
  {
    type: 'unlimited',
    title: '12 months',
    price: 1000,
    description: 'Best offer for dedicated clients.',
    priceId: 'price_1RaDqYHCX17lsTRp5W98G0sp',
    trainingsCoiunt: 12,
  },
  {
    type: 'one',
    title: '1 session',
    price: 25,
    description: 'Try one individual session without commitment.',
    priceId: 'price_1RaEHAHCX17lsTRpYB12g57y',
  },
];
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({ color: '#000' }),
}));
jest.mock('../../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));
jest.mock('../../services/planService.ts', () => ({
  getAllPlans: jest.fn(),
}));
jest.mock('../../services/authService.ts', () => ({
  getMe: jest.fn(),
}));
jest.mock('react-spinners', () => ({
  BounceLoader: ({ loading }: { loading: boolean }) =>
    loading ? <div data-testid='loader'>Loading...</div> : null,
}));

describe('Pricing', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('shows pricing cards with plans', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: plans,
      loading: false,
      error: null,
    });
    render(<Pricing />);
    const uniqueTypes = [...new Set(plans.map((plan) => plan.type))];
    uniqueTypes.forEach((type) => {
      expect(
        screen.getByRole('heading', { name: new RegExp(type, 'i') })
      ).toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { name: /pricing plans/i }));
  });
  test('shows loader when loading is true and data is empty', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });
    render(<Pricing />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  test('shows try agin later when err is true and data is empty', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: new Error(),
    });
    render(<Pricing />);
    expect(
      screen.getByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });
});
