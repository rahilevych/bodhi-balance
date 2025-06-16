import { Training } from '../../types/Types';
import { getTimeFromDate } from '../../utils/dateHelpers';
import Button from '../Button/Button';
import styles from './ScheduleCard.module.css';
interface Props {
  item: Training;
  onClick: () => void;
}
export const ScheduleCard = ({ item, onClick }: Props) => {
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
      <Button
        text='Book a class'
        className={styles.bookBtn}
        onClick={onClick}></Button>
    </div>
  );
};
