import { Element } from 'react-scroll';

import styles from './Pricing.module.css';
import { PricingCard } from './PricingCard';
import { useEffect, useState } from 'react';
import { Plan } from '../../types/Types';
import { getAllPlans } from '../../services/planService';

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const types = plans.reduce((acc, plan) => {
    if (!acc[plan.type]) acc[plan.type] = [];
    acc[plan.type].push(plan);
    return acc;
  }, {} as Record<string, typeof plans>);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getAllPlans();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };
    init();
  }, []);
  return (
    <Element name='pricing'>
      <section id='pricing' className={styles.pricing}>
        <div className='container'>
          <h2>Pricing plans</h2>
          <div className={styles.plans}>
            {' '}
            {Object.entries(types).map(([type, plans]) => (
              <PricingCard type={type} plans={plans} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Pricing;
