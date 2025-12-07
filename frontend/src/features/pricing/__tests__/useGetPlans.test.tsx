import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { PlanService } from '../service/PlanService';
import { useGetPlans } from '../hooks/useGetPlans';

jest.mock('../service/PlanService');

const mockPlans = [
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

describe('useGetQuestion', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('returns plans on success', async () => {
    (PlanService.getAllPlans as jest.Mock).mockResolvedValue(mockPlans);

    const { result } = renderHook(() => useGetPlans(), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockPlans));
    expect(PlanService.getAllPlans).toHaveBeenCalled();
  });
});
