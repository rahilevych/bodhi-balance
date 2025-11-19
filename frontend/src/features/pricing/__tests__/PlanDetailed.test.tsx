import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PlanDetailed } from '../components/plan-detailed/PlanDetailed';

const mockStartCheckout = jest.fn();

jest.mock('../../hooks/useCheckout', () => ({
  useCheckout: () => ({
    startCheckout: mockStartCheckout,
  }),
}));
jest.mock('../../services/planService', () => ({
  getPlanById: jest.fn(),
}));

jest.mock('../../hooks/useFetchDataWithParam', () => ({
  useFetchDataWithParam: () => ({
    data: {
      _id: '123',
      type: 'Pack',
      title: '5 Pack',
      description: 'Best for professionals',
      price: 49,
      priceId: 'priceId',
    },
    loading: false,
    error: null,
  }),
}));
describe('PlanDetailed', () => {
  beforeEach(() => {
    mockStartCheckout.mockClear();
  });
  test('render correctly plan data', () => {
    render(<PlanDetailed id='123' />);
    expect(screen.getByText('5 Pack')).toBeInTheDocument();
    expect(screen.getByText('Price:')).toBeInTheDocument();
    expect(screen.getByText('49 $')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buy/i })).toBeInTheDocument();
  });
  test('by button click start chekoutSession', async () => {
    const user = userEvent.setup();
    render(<PlanDetailed id='123' />);
    const button = screen.getByRole('button', { name: /buy/i });
    await user.click(button);
    expect(mockStartCheckout).toHaveBeenCalledTimes(1);
    expect(mockStartCheckout).toHaveBeenCalledWith('123', 'subscription');
  });
});
