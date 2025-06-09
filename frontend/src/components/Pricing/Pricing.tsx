import { Element } from 'react-scroll';

import styles from './Pricing.module.css';
import { PricingCard } from './PricingCard';
import { useEffect, useState } from 'react';
import { Plan } from '../../types/Types';
import { getAllPlans } from '../../services/planService';
import { useAppContext } from '../../context/AppContext';
import { BounceLoader } from 'react-spinners';

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const { loading, color } = useAppContext();

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
          {plans.length > 0 ? (
            <div className={styles.plans}>
              {' '}
              {Object.entries(types).map(([type, plans]) => (
                <PricingCard key={type} type={type} plans={plans} />
              ))}
            </div>
          ) : (
            <BounceLoader color={color} loading={loading} />
          )}
        </div>
      </section>
    </Element>
  );
};

export default Pricing;
