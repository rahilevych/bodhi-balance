import { render, screen, fireEvent } from '@testing-library/react';
import { PlanDetailed } from '../components/plan-detailed/PlanDetailed';
import { useGetPlan } from '../hooks/useGetPlan';
import { useCreateCheckoutSession } from '../../payment/hooks/useCreateCheckoutSession';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../hooks/useGetPlan');
jest.mock('../../payment/hooks/useCreateCheckoutSession');

const mockPlan = {
  _id: '1',
  type: 'subscription',
  title: 'Monthly Plan',
  description: 'Plan description',
  price: 50,
  priceId: 'p1',
};

describe('PlanDetailed component', () => {
  const mutateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGetPlan as jest.Mock).mockReturnValue({ data: mockPlan });
    (useCreateCheckoutSession as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });
  });

  test('renders plan details', () => {
    render(
      <MemoryRouter>
        <PlanDetailed id='1' />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockPlan.title)).toBeInTheDocument();
    expect(screen.getByText(mockPlan.description)).toBeInTheDocument();
    expect(screen.getByText(`Price:`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPlan.price} $`)).toBeInTheDocument();
    expect(screen.getByText('Buy Checkout')).toBeInTheDocument();
  });

  test('calls startCheckout on button click', () => {
    render(
      <MemoryRouter>
        <PlanDetailed id='1' />
      </MemoryRouter>,
    );

    const button = screen.getByText('Buy Checkout');
    fireEvent.click(button);

    expect(mutateMock).toHaveBeenCalledWith({
      productId: mockPlan._id,
      type: 'subscription',
    });
  });

  test('shows processing text when isPending is true', () => {
    (useCreateCheckoutSession as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
    });

    render(
      <MemoryRouter>
        <PlanDetailed id='1' />
      </MemoryRouter>,
    );

    expect(screen.getByText('Buy Processing...')).toBeInTheDocument();
  });

  test('returns null if plan is undefined', () => {
    (useGetPlan as jest.Mock).mockReturnValue({ data: undefined });

    const { container } = render(
      <MemoryRouter>
        <PlanDetailed id='1' />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });
});
