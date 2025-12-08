import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SubscriptionService } from '../service/SubscriptionService';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetSubscription } from '../hooks/useGetSubscription';

jest.mock('../service/SubscriptionService');

describe('useGetSubscription', () => {
  const mockSubscription = {
    _id: '123',
    type: { title: '3 months', type: 'unlimited' },
    status: 'active',
    validUntil: new Date(),
  };
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('fetches and returns subscription data', async () => {
    (
      SubscriptionService.getSubscriptionByUserId as jest.Mock
    ).mockResolvedValue(mockSubscription);

    const { result } = renderHook(() => useGetSubscription(), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockSubscription));
    expect(SubscriptionService.getSubscriptionByUserId).toHaveBeenCalledTimes(
      1,
    );
  });
});
