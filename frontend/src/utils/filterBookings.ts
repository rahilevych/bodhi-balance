import { Booking } from '../types/Types';

export const filterBookings = (bookings: Booking[], activeTab: string) => {
  const now = new Date();
  return bookings.filter((booking) => {
    const trainingDate = new Date(booking.training.datetime);
    if (activeTab == 'upcoming') {
      return booking.status === 'booked' && trainingDate >= now;
    }
    if (activeTab === 'completed') {
      return (
        booking.status === 'completed' ||
        (booking.status === 'booked' && trainingDate < now)
      );
    }
    if (activeTab === 'cancelled') {
      return booking.status === 'cancelled';
    }
    return false;
  });
};
