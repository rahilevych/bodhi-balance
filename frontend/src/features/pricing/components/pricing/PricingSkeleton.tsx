import { PricingCardSkeleton } from '../pricing-card/PricingCardSkeleton';
import styles from './Pricing.module.css';

export const PricingSkeleton = () => {
  return (
    <section id='pricing' className={styles.pricing}>
      <div className='container'>
        <h2>Pricing plans</h2>
        <div className={styles.plans}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <PricingCardSkeleton key={i} />
            ))}
        </div>
      </div>
    </section>
  );
};
