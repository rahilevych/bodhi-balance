import styles from './YogaFullCard.module.css';
import Skeleton from 'react-loading-skeleton';

export const YogaFullCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <Skeleton height='20rem' width='15rem' />
      </div>
      <div className={styles.info}>
        <Skeleton width={150} height={16} />
        <Skeleton width={120} height={16} />
        <Skeleton width={100} height={16} />
        <Skeleton width={150} height={16} />
      </div>
    </div>
  );
};
