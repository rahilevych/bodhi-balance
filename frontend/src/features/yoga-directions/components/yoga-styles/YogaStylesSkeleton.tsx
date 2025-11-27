import Skeleton from 'react-loading-skeleton';
import styles from './YogaStyles.module.css';
import { YogaFullCardSkeleton } from '../yoga-full-card/YogaFullCardSkeleton';
import { SliderCardSkeleton } from '../../../../shared/ui/slider-card/SliderCardSkeleton';

export const YogaStylesSkeleton = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <section className={styles.yogastyles}>
      <div className='container'>
        <Skeleton width={100} />

        <div className={styles.content}>
          {!isMobile && (
            <div className={styles.selected}>
              <YogaFullCardSkeleton />
            </div>
          )}

          <div className={styles.slider}>
            {Array.from({ length: 3 }).map((_, i) =>
              isMobile ? (
                <YogaFullCardSkeleton key={i} />
              ) : (
                <SliderCardSkeleton key={i} />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
