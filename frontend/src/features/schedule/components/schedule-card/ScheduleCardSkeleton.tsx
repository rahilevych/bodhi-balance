import Skeleton from 'react-loading-skeleton';
import styles from './ScheduleCard.module.css';

export const ScheduleCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <Skeleton width={150} height={21} />
        <Skeleton width={150} height={16} count={3} />
      </div>
      <div className={styles.nav}>
        <Skeleton width={150} height={16} />
        <Skeleton width={150} height={40} />
      </div>
    </div>
  );
};
