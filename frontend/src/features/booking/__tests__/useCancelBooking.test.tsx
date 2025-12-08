import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCancelBooking } from '../hooks/useCancelBooking';
import { BookingService } from '../service/BookingService';

jest.mock('../service/BookingService.ts', () => {
  return {
    BookingService: class {
      static cancelBooking = jest.fn();
    },
  };
});

describe('useCancelBooking hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('calls BookingService.cancelBooking with correct parameters', async () => {
    (BookingService.cancelBooking as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useCancelBooking(), { wrapper });

    act(() => {
      result.current.mutate({ bookingId: 'booking1', trainingId: 'training1' });
    });

    await waitFor(() =>
      expect(BookingService.cancelBooking).toHaveBeenCalledWith(
        'booking1',
        'training1',
      ),
    );
  });

  test('invalidates bookings query on success', async () => {
    (BookingService.cancelBooking as jest.Mock).mockResolvedValue({
      success: true,
    });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useCancelBooking(), { wrapper });

    act(() => {
      result.current.mutate({ bookingId: 'booking2', trainingId: 'training2' });
    });

    await waitFor(() =>
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['bookings', 'currentUser'],
      }),
    );
  });

  test('handles mutation error', async () => {
    const error = new Error('Cancel failed');
    (BookingService.cancelBooking as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useCancelBooking(), { wrapper });

    act(() => {
      result.current.mutate({ bookingId: 'booking3', trainingId: 'training3' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(error);
  });
});
