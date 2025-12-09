import api from '../../../shared/api/axiosInstance';

export class BookingService {
  static async getBookingsByUserId() {
    const res = await api.get(`/booking/trainings`);
    return res.data;
  }
  static async cancelBooking(bookingId: string, trainingId: string) {
    const res = await api.patch(`/booking/training/cancel`, {
      bookingId,
      trainingId,
    });
    return res.data;
  }
}
