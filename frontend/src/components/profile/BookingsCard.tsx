import { Booking } from '../../types/Types';
import { convertDateToString } from '../../utils/dateHelpers';
import styles from './BookingsCard.module.css';
interface BookingsCardProps {
  booking: Booking;
}

export const BookingsCard = ({ booking }: BookingsCardProps) => {
  return (
    <div className={styles.card}>
      <p>
        <label>Training:</label> {booking.training.yogaStyle_id.title}
      </p>
      <p>
        <label>Booking date:</label> {convertDateToString(booking.date)}
      </p>
      <p>
        <label>Training date:</label>{' '}
        {convertDateToString(booking.training.datetime)}
      </p>
      <p>
        <label>Status:</label> {booking.status}
      </p>
    </div>
  );
};
