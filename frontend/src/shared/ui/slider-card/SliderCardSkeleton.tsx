import Skeleton from 'react-loading-skeleton';
import styles from './SliderCard.module.css';
export const SliderCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <Skeleton width='10rem' height='15rem' />
      <Skeleton width={100} />
    </div>
  );
};
