import { getNext7Days } from '../../../../utils/dateHelpers';
import styles from './ScheduleDays.module.css';

interface ScheduleDaysProps {
  day: Date;
  setDay: (day: Date) => void;
}
export const ScheduleDays = ({ day, setDay }: ScheduleDaysProps) => {
  return (
    <div className={styles.days}>
      <ul>
        {getNext7Days().map((date, index) => (
          <li
            className={
              date.toDateString() === day.toDateString() ? styles.active : ''
            }
            key={index}
            onClick={() => setDay(date)}
          >
            <p className={styles.weekday}>
              {date.toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
            <p className={styles.dayMonth}>
              {date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'numeric',
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
