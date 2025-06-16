import { Element } from 'react-scroll';
import styles from './Pricing.module.css';
import { PricingCard } from './PricingCard';
import { Plan } from '../../types/Types';
import { getAllPlans } from '../../services/planService';
import { useAppContext } from '../../context/AppContext';
import { BounceLoader } from 'react-spinners';
import { useFetchData } from '../../hooks/useFetchData';

const Pricing = () => {
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

  if (error) {
    return <div>Somethig went wrong!</div>;
  }
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
