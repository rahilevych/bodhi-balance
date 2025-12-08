import { SubscriptionSection } from '../../subscription/components/subscription/Subscription';
import { render, screen } from '@testing-library/react';
import { convertDateToString } from '../../../utils/dateHelpers';
import { useGetSubscription } from '../hooks/useGetSubscription';

jest.mock('../hooks/useGetSubscription.ts');

describe('Subscription', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('shows "You dont have active subscriptions" if user has no subscription', () => {
    (useGetSubscription as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
    });
    render(<SubscriptionSection />);
    expect(
      screen.getByText(/You don't have active subscriptions/i),
    ).toBeInTheDocument();
  });
  test('renders unlimited subscription data', () => {
    const subscription = {
      _id: '123',
      type: { title: '3 months', type: 'unlimited' },
      status: 'active',
      validUntil: new Date(),
    };
    (useGetSubscription as jest.Mock).mockReturnValue({
      data: subscription,
      isPending: false,
    });

    render(<SubscriptionSection />);
    expect(screen.getByText(/Plan name:/)).toBeInTheDocument();
    expect(screen.getByText(subscription.type.title)).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(subscription.status)).toBeInTheDocument();
    expect(screen.getByText(/Valid Until:/)).toBeInTheDocument();
    expect(
      screen.getByText(convertDateToString(subscription.validUntil)),
    ).toBeInTheDocument();
  });
  test('renders pack subscription data', () => {
    const subscription = {
      type: { title: '5-Class Pack', type: 'pack' },
      status: 'active',
      remainingTrainings: 4,
    };

    (useGetSubscription as jest.Mock).mockReturnValue({
      data: subscription,
      isPending: false,
    });

    render(<SubscriptionSection />);
    expect(screen.getByText(/Plan name:/)).toBeInTheDocument();
    expect(screen.getByText(subscription.type.title)).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(subscription.status)).toBeInTheDocument();
    expect(
      screen.getByText(/Number of remaining trainings:/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(subscription.remainingTrainings),
    ).toBeInTheDocument();
  });
  test('shows nothing while loading', () => {
    (useGetSubscription as jest.Mock).mockReturnValue({
      data: null,
      isPending: true,
    });
    render(<SubscriptionSection />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
