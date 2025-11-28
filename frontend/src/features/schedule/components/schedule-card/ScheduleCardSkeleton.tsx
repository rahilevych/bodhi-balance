import Skeleton from 'react-loading-skeleton';
import styles from './ScheduleCard.module.css';

export const ScheduleCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <Skeleton width={150} height={16} count={5} />
      <Skeleton width={150} height={40} />
    </div>
  );
};
