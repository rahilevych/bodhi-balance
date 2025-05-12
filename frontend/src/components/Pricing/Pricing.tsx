import { Element } from 'react-scroll';
import { plans } from '../../data/plans';
import styles from './Pricing.module.css';
import { PricingCard } from './PricingCard';

const Pricing = () => {
  return (
    <Element name='pricing'>
      <section id='pricing' className={styles.pricing}>
        <div className='container'>
          <h2>Pricing plans</h2>
          <div className={styles.plans}>
            {' '}
            {plans.map((plan, index) => (
              <PricingCard plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Pricing;
