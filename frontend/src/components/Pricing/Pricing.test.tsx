import { render, screen } from '@testing-library/react';
import { Pricing } from './Pricing';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { plansMock } from '../../__mocks__/plansMock';

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
      data: plansMock,
      loading: false,
      error: null,
    });
    render(<Pricing />);
    const uniqueTypes = [...new Set(plansMock.map((plan) => plan.type))];
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
