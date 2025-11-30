import Skeleton from 'react-loading-skeleton';
import styles from './ScheduleDays.module.css';

export const ScheduleDaysSkeleton = () => {
  return (
    <div className={styles.days}>
      <ul>
        {Array.from({ length: 7 }).map((_, i) => (
          <li key={i} className={styles.skeletonDay}>
            <p className={styles.weekday}>
              <Skeleton width={60} height={18} />
            </p>
            <p className={styles.dayMonth}>
              <Skeleton width={40} height={18} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
