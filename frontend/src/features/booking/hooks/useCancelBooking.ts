import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookingService } from '../service/BookingService';
export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookingId,
      trainingId,
    }: {
      bookingId: string;
      trainingId: string;
    }) => {
      return BookingService.cancelBooking(bookingId, trainingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'currentUser'],
      });
    },
  });
};
