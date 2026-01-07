import styles from './YogaStyles.module.css';
import { YogaFullCardSkeleton } from '../yoga-full-card/YogaFullCardSkeleton';
import { SliderCardSkeleton } from '../../../../shared/ui/slider-card/SliderCardSkeleton';
import { useAppContext } from '../../../../context/AppContext';

export const YogaStylesSkeleton = () => {
  const { isMobile } = useAppContext();
  return (
    <section className={styles.yogastyles} data-testid='skeleton'>
      <div className='container'>
        <h2>Yoga styles</h2>

        <div className={styles.content}>
          {!isMobile && (
            <div className={styles.selected}>
              <YogaFullCardSkeleton />
            </div>
          )}

          <div className={styles.sliderSkeleton}>
            {Array.from({ length: 1 }).map((_, i) =>
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
