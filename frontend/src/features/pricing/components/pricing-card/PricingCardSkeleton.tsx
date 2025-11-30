import Skeleton from 'react-loading-skeleton';
import styles from './PricingCard.module.css';

export const PricingCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <Skeleton width={150} height={21} />
      <div className={styles.categories}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} width={100} height={18} />
        ))}
      </div>
      <Skeleton count={3} width={250} height={18} />
      <div>
        {' '}
        <Skeleton width={200} height={50} />
      </div>
    </div>
  );
};
