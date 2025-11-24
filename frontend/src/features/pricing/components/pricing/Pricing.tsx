import { Element } from 'react-scroll';
import styles from './Pricing.module.css';
import { PricingCard } from '../pricing-card/PricingCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { container } from '../../../../animations/landing-variannts';
import { useGetPlans } from '../../hooks/useGetPlans';
import { Plan } from '../../../../types/Types';
export const Pricing = () => {
  const { data: plans } = useGetPlans();
  console.log(plans);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  if (!plans) return <p>Loading plans...</p>;
  const types = plans.reduce((acc: Record<string, Plan[]>, plan: Plan) => {
    if (!acc[plan.type]) acc[plan.type] = [];
    acc[plan.type].push(plan);
    return acc;
  }, {});

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
          <div className={styles.plans}>
            {Object.entries(types).map(([type, plans]) => (
              <PricingCard key={type} type={type} plans={plans as Plan[]} />
            ))}
          </div>
        </motion.div>
      </section>
    </Element>
  );
};
