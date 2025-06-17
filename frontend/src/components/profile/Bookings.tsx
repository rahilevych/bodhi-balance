import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useFetchDataWithParam } from '../../hooks/useFetchDataWithParam';
import { getBookingsByUserId } from '../../services/bookingsService';
import { Booking } from '../../types/Types';
import { convertDateToString } from '../../utils/dateHelpers';
import styles from './Bookings.module.css';
import { BookingsCard } from './BookingsCard';
export const Bookings = () => {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<
    'upcoming' | 'completed' | 'cancelled'
  >('upcoming');
  const {
    data: bookings,
    loading,
    error,
  } = useFetchDataWithParam<Booking, string>({
    fetchFunction: getBookingsByUserId,
    param: user?._id,
  });
  const now = new Date();
  const filterBookings = Array.isArray(bookings)
    ? bookings?.filter((booking) => {
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
      })
    : [];

  return (
    <div className={styles.bookings}>
      <ul className={styles.tabs}>
        <li
          className={`${styles.tab} ${
            activeTab === 'upcoming' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('upcoming')}>
          Upcoming
        </li>
        <li
          className={`${styles.tab} ${
            activeTab === 'completed' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('completed')}>
          Completed
        </li>
        <li
          className={`${styles.tab} ${
            activeTab === 'cancelled' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('cancelled')}>
          Cancelled
        </li>
      </ul>
      {filterBookings.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>№</th>
              <th>Training</th>
              <th>Booking date</th>
              <th>Training date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filterBookings.map((booking: Booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.training.yogaStyle_id.title}</td>

                <td>{convertDateToString(booking.date)}</td>
                <td>{convertDateToString(booking.training.datetime)}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.nodata}> No bookings found </div>
      )}
      <div className={styles.cardList}>
        {filterBookings.map((booking, index) => (
          <BookingsCard key={index} booking={booking} />
        ))}
      </div>
    </div>
  );
};
