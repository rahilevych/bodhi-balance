import React from 'react';
import styles from './YogaFullCard.module.css';
import Skeleton from 'react-loading-skeleton';
export const YogaFullCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <Skeleton height='20rem' width='15rem' />
      </div>
      <div className={styles.info}>
        <Skeleton width={150} />
        <Skeleton width={100} />
        <Skeleton width={100} />
        <Skeleton width={150} height={30} />
      </div>
    </div>
  );
};
