import { SubscriptionSection } from '../components/subscription/Subscription';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from '../../../context/AppContext';
import { useFetchDataWithParam } from '../../../hooks/useFetchDataWithParam';
import { Subscription } from '../../../types/Types';
import { convertDateToString } from '../../../utils/dateHelpers';

jest.mock('../../hooks/useFetchDataWithParam', () => ({
  useFetchDataWithParam: jest.fn(),
}));
jest.mock('../../services/authService', () => ({
  getMe: jest.fn(),
}));
jest.mock('../../services/subscriptionService', () => ({
  getSubscriptionByUserId: jest.fn(),
}));
jest.mock('../../context/AppContext', () => ({
  useAppContext: jest.fn(),
}));
jest.mock('react-spinners', () => ({
  BounceLoader: ({ loading }: { loading: boolean }) =>
    loading ? <div data-testid='loader'>Loading...</div> : null,
}));

describe('Subscription', () => {
  const mockUseFetch = useFetchDataWithParam as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      user: { _id: '123' },
      color: '#000',
    });
  });
  test('shows "You dont have active subscriptions" if user has no subscription', () => {
    (mockUseFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
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

    mockUseFetch.mockReturnValue({
      data: subscription,
      loading: false,
      error: null,
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

    mockUseFetch.mockReturnValue({
      data: subscription,
      loading: false,
      error: null,
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
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<SubscriptionSection />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
