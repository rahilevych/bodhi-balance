import { renderHook, waitFor } from '@testing-library/react';
import { useGetPlan } from '../hooks/useGetPlan';
import { PlanService } from '../service/PlanService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../service/PlanService');
const mockPlan = {
  _id: '1',
  type: 'subscription',
  title: 'Monthly Plan',
  description: 'Plan description',
  price: 50,
  priceId: 'p1',
};

describe('useGetPlan', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and returns plan data', async () => {
    (PlanService.getPlanById as jest.Mock).mockResolvedValue(mockPlan);

    const { result } = renderHook(() => useGetPlan('1'), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockPlan));
    expect(PlanService.getPlanById).toHaveBeenCalledWith('1');
  });
});
