import { useState } from 'react';
import { Booking } from '../../../../types/Types';
import { convertDateToString } from '../../../../utils/dateHelpers';
import styles from './Bookings.module.css';
import { BookingsCard } from '../booking-card/BookingsCard';
import { ConfirmationWindow } from '../../../../styles/modal/ConfirmationWindow';
import { filterBookings } from '../../../../utils/filterBookings';
import Button from '../../../../shared/ui/button/Button';
import { useGetBookingsByUser } from '../../hooks/useGetBookingByUser';
import { useCancelBooking } from '../../hooks/useCancelBooking';
import { useAppContext } from '../../../../context/AppContext';

export const Bookings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isMobile } = useAppContext();
  const [activeTab, setActiveTab] = useState<
    'upcoming' | 'completed' | 'cancelled'
  >('upcoming');

  const { data: bookings, isPending } = useGetBookingsByUser();
  const cancelBooking = useCancelBooking();
  if (isPending) return <p>Loading...</p>;
  const now = new Date();

  const filtered = Array.isArray(bookings)
    ? filterBookings(bookings, activeTab)
    : [];

  const handleCancel = async (bookingId: string, trainingId: string) => {
    cancelBooking.mutate({ bookingId: bookingId, trainingId: trainingId });
  };

  return (
    <div className={styles.bookings}>
      <>
        <ul className={styles.tabs}>
          <li
            className={`${styles.tab} ${
              activeTab === 'upcoming' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </li>
          <li
            className={`${styles.tab} ${
              activeTab === 'completed' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </li>
          <li
            className={`${styles.tab} ${
              activeTab === 'cancelled' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </li>
        </ul>
        {isMobile ? (
          <div className={styles.cardList}>
            {filtered.map((booking, index) => (
              <BookingsCard
                key={index}
                booking={booking}
                handleCancel={handleCancel}
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Training</th>
                <th>Booking date</th>
                <th>Training date</th>
                <th>Status</th>
                <th>Cancellation</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking: Booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.training.yogaStyle_id.title}</td>
                  <td>{convertDateToString(booking.date)}</td>
                  <td>{convertDateToString(booking.training.datetime)}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === 'booked' &&
                    new Date(booking.training.datetime).getTime() -
                      now.getTime() >
                      24 * 60 * 60 * 1000 ? (
                      <>
                        <Button onClick={() => setIsModalOpen(true)}>
                          Cancel
                        </Button>
                        <ConfirmationWindow
                          isOpen={isModalOpen}
                          message='Are you sure you want to cancel?'
                          onConfirm={() => {
                            setIsModalOpen(false);
                            handleCancel(booking._id, booking.training._id);
                          }}
                          onCancel={() => setIsModalOpen(false)}
                        />
                      </>
                    ) : (
                      <p>Cancellation isn't available</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.nodata}>No bookings found</div>
        )}
      </>
    </div>
  );
};
