import { useQuery } from '@tanstack/react-query';
import { BookingService } from '../service/BookingService';

export const useGetBookingsByUser = () => {
  return useQuery({
    queryKey: ['bookings', 'user'],
    queryFn: BookingService.getBookingsByUserId,
    staleTime: 1000 * 60 * 5,
  });
};
