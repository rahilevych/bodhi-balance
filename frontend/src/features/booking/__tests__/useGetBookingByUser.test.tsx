import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { BookingService } from '../service/BookingService';
import { useGetBookingsByUser } from '../hooks/useGetBookingByUser';

jest.mock('../service/BookingService.ts', () => {
  return {
    BookingService: class {
      static getBookingsByUserId = jest.fn();
    },
  };
});
describe('useGetBookingByUser hook', () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  test('fetches and returns bookings data', async () => {
    const mockBookings = [
      { id: 1, title: 'Test1' },
      { id: 2, title: 'Test2' },
    ];
    (BookingService.getBookingsByUserId as jest.Mock).mockResolvedValue(
      mockBookings,
    );
    const { result } = renderHook(() => useGetBookingsByUser(), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(mockBookings));
    expect(BookingService.getBookingsByUserId).toHaveBeenCalled();
  });
});
