/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PricingCard } from '../components/pricing-card/PricingCard';

import { BrowserRouter } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { Plan } from '../../../types/Types';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: jest.fn(),
}));
jest.mock('react-scroll', () => ({
  scroller: {
    scrollTo: jest.fn(),
  },
}));
describe('PricingCard', () => {
  const mockNavigate = jest.fn();
  const plans: Plan[] = [
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <PricingCard plans={plans} type='Test Type' />
      </BrowserRouter>,
    );

  test('renders plans and default selected', () => {
    renderComponent();
    expect(screen.getByText('Test Type')).toBeInTheDocument();
    expect(screen.getByText('1 Session')).toHaveClass('active');
    expect(screen.getByText('Desc1')).toBeInTheDocument();
    expect(screen.getByText('Price: 10')).toBeInTheDocument();
  });

  test('changes active plan on click', async () => {
    const user = userEvent.setup();
    renderComponent();
    const monthlyPlan = screen.getByText('Monthly Plan');

    await user.click(monthlyPlan);

    expect(monthlyPlan).toHaveClass('active');
    expect(screen.getByText('Desc2')).toBeInTheDocument();
    expect(screen.getByText('Price: 50')).toBeInTheDocument();
  });

  test('scrolls when "1 session" plan is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();
    const buyBtn = screen.getByText('Buy now');

    await user.click(buyBtn);

    expect(scroller.scrollTo).toHaveBeenCalledWith('schedule', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navigates when other plan is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText('Monthly Plan'));

    const buyBtn = screen.getByText('Buy now');
    await user.click(buyBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/detailed/plan/2');
  });
});
