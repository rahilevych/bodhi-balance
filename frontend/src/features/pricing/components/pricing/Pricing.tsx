import { Element } from 'react-scroll';
import styles from './Pricing.module.css';
import { Plan } from '../../../../types/Types';
import { getAllPlans } from '../../../../services/planService';
import { useAppContext } from '../../../../context/AppContext';
import { BounceLoader } from 'react-spinners';
import { useFetchData } from '../../../../hooks/useFetchData';
import { PricingCard } from '../pricing-card/PricingCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { container } from '../../../../animations/landing-variannts';
export const Pricing = () => {
  const {
    data: plans,
    loading,
    error,
  } = useFetchData<Plan>({ fetchFunction: getAllPlans });
  const { color } = useAppContext();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const types = plans.reduce((acc, plan) => {
    if (!acc[plan.type]) acc[plan.type] = [];
    acc[plan.type].push(plan);
    return acc;
  }, {} as Record<string, typeof plans>);

  return (
    <Element name='pricing'>
      <section id='pricing' className={styles.pricing} ref={ref}>
        <motion.div
          className='container'
          variants={container}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2>Pricing plans</h2>
          {loading ? (
            <BounceLoader color={color} loading={loading} />
          ) : error ? (
            <p>Something went wrong. Please try again later.</p>
          ) : plans.length === 0 ? (
            <p>No plans available at the moment.</p>
          ) : (
            <div className={styles.plans}>
              {Object.entries(types).map(([type, plans]) => (
                <PricingCard key={type} type={type} plans={plans} />
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </Element>
  );
};
