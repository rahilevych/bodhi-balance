import { useAppContext } from '../../../../context/AppContext';
import Button from '../../../../shared/ui/button/Button';

import { Training } from '../../../../types/Types';
import { getTimeFromDate } from '../../../../utils/dateHelpers';
import styles from './ScheduleCard.module.css';
interface Props {
  item: Training;
  onClick: (id: string) => void;
}
export const ScheduleCard = ({ item, onClick }: Props) => {
  const { user } = useAppContext();
  const now = new Date();
  return (
    <div className={styles.card}>
      <p>
        <strong>Time:</strong>
        {getTimeFromDate(item.datetime)}
      </p>
      <p>
        <strong>Type:</strong> {item.yogaStyle_id.title}
      </p>

      <p>
        <strong>Spots:</strong> {item.spots_taken}/{item.spots_total}
      </p>
      <p>
        <strong>Duration:</strong>
        {item.yogaStyle_id.duration}
      </p>
      <p>
        <strong>Trainer:</strong> {item.trainer_id.fullName}
      </p>
      <div>
        {new Date(item.datetime) < now ||
        item.spots_taken === item.spots_total ? (
          <p>Booking closed</p>
        ) : user?.bookings.some(
            (booking) =>
              booking.training &&
              booking.status === 'booked' &&
              booking.training._id.toString() === item._id.toString(),
          ) ? (
          <p className={styles.disabledText}>Already booked</p>
        ) : (
          <Button
            className={styles.bookBtn}
            onClick={() => {
              onClick(item._id);
            }}
          >
            Book
          </Button>
        )}
      </div>
    </div>
  );
};
