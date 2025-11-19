import { Element } from 'react-scroll';
import styles from './Pricing.module.css';
import { PricingCard } from '../pricing-card/PricingCard';
import { Plan } from '../../../../types/Types';
import { getAllPlans } from '../../../../services/planService';
import { useAppContext } from '../../../../context/AppContext';
import { BounceLoader } from 'react-spinners';
import { useFetchData } from '../../../../hooks/useFetchData';

export const Pricing = () => {
  const {
    data: plans,
    loading,
    error,
  } = useFetchData<Plan>({ fetchFunction: getAllPlans });
  const { color } = useAppContext();

  const types = plans.reduce((acc, plan) => {
    if (!acc[plan.type]) acc[plan.type] = [];
    acc[plan.type].push(plan);
    return acc;
  }, {} as Record<string, typeof plans>);

  return (
    <Element name='pricing'>
      <section id='pricing' className={styles.pricing}>
        <div className='container'>
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
        </div>
      </section>
    </Element>
  );
};
