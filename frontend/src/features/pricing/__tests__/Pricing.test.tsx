import { render, screen } from '@testing-library/react';
import { Pricing } from '../components/pricing/Pricing';
import { Plan } from '../../../types/Types';
import { useGetPlans } from '../hooks/useGetPlans';
import { MemoryRouter } from 'react-router';

jest.mock('../hooks/useGetPlans');

const mockPlans: Plan[] = [
  {
    _id: '1',
    type: 'single',
    title: '1 Session',
    description: 'Desc1',
    price: 10,
    priceId: 'p1',
  },
  {
    _id: '2',
    type: 'monthly',
    title: 'Monthly Plan',
    description: 'Desc2',
    price: 50,
    priceId: 'p2',
  },
  {
    _id: '3',
    type: 'single',
    title: '2 Sessions',
    description: 'Desc3',
    price: 20,
    priceId: 'p3',
  },
];

describe('Pricing component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders skeleton while loading', () => {
    (useGetPlans as jest.Mock).mockReturnValue({
      data: undefined,
      isPending: true,
    });
    render(<Pricing />);
    expect(screen.getByTestId('pricing-skeleton')).toBeInTheDocument();
  });

  test('renders PricingCard for each plan type after data is loaded', () => {
    (useGetPlans as jest.Mock).mockReturnValue({
      data: mockPlans,
      isPending: false,
    });
    render(
      <MemoryRouter>
        <Pricing />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Pricing plans/i)).toBeInTheDocument();

    expect(screen.getByText('single')).toBeInTheDocument();
    expect(screen.getByText('monthly')).toBeInTheDocument();

    expect(screen.getByText('1 Session')).toBeInTheDocument();
    expect(screen.getByText('Monthly Plan')).toBeInTheDocument();
  });
});
