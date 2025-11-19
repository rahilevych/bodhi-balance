import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { PricingCard } from '../../features/pricing/components/pricing-card/PricingCard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PricingCard', () => {
  const mockNavigate = jest.fn();
  const user = userEvent.setup();
  const plans = [
    {
      _id: 'id1',
      type: 'pack',
      title: '5-Class pack',
      price: 100,
      description: 'Flexible schedules or occasional visitors',
      priceId: 'price_1RaDrbHCX17lsTRpRlbNr3y4',
      trainingsCoiunt: 5,
    },
    {
      _id: 'id2',
      type: 'pack',
      title: '10-Class pack',
      price: 220,
      description: 'Flexible schedules or occasional visitors',
      priceId: 'price_1RaDrxHCX17lsTRpida8URQV',
      trainingsCoiunt: 10,
    },
  ];
  const type = 'pack';

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders correct component', () => {
    render(<PricingCard type={type} plans={plans} />);
    expect(
      screen.getByRole('button', { name: /buy now/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: new RegExp(type, 'i') }));
    expect(screen.getByText(plans[0].description)).toBeInTheDocument();
    expect(screen.getByText(plans[0].title)).toHaveClass('active');
  });
  test('switches to information about another plan on click', async () => {
    render(<PricingCard type='pack' plans={plans} />);

    const firstDescription = screen.getByText(plans[0].description);
    expect(firstDescription).toBeInTheDocument();
    await user.click(screen.getByText(plans[1].title));
    const secondDescription = screen.getByText(plans[1].description);
    expect(secondDescription).toBeInTheDocument();
  });
  test('button click navigates to "/detailed/plan/plan._id" ', async () => {
    render(<PricingCard type='pack' plans={plans} />);
    await user.click(screen.getByRole('button', { name: /buy now/i }));
    expect(mockNavigate).toHaveBeenCalledWith(`/detailed/plan/${plans[0]._id}`);
  });
});
