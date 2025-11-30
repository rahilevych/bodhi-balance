import Button from '../../../../shared/ui/button/Button';
import { Booking, Training } from '../../../../types/Types';
import { getTimeFromDate } from '../../../../utils/dateHelpers';
import { useProfile } from '../../../auth/hooks/useProfile';
import styles from './ScheduleCard.module.css';
interface Props {
  item: Training;
  onClick: (id: string) => void;
}
export const ScheduleCard = ({ item, onClick }: Props) => {
  const { data: user } = useProfile();
  const now = new Date();
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        {' '}
        <h3>{item.yogaStyle_id.title}</h3>
        <p>
          <strong>Trainer:</strong> {item.trainer_id.fullName}
        </p>
        <p>
          <strong>Duration:</strong>
          {item.yogaStyle_id.duration}
        </p>
        <p>
          <strong>Spots:</strong> {item.spots_taken}/{item.spots_total}
        </p>
      </div>
      <div className={styles.nav}>
        <p>
          <strong>Time:</strong>
          {getTimeFromDate(item.datetime)}
        </p>
        <div>
          {new Date(item.datetime) < now ||
          item.spots_taken === item.spots_total ? (
            <p>Booking closed</p>
          ) : user?.bookings.some(
              (booking: Booking) =>
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
    </div>
  );
};
