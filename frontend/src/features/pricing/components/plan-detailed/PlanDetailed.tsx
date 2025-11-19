import { useCheckout } from '../../../../hooks/useCheckout';
import { useFetchDataWithParam } from '../../../../hooks/useFetchDataWithParam';
import { getPlanById } from '../../../../services/planService';
import { Plan } from '../../../../types/Types';
import Button from '../../../../shared/button/Button';
import styles from './PlanDetailed.module.css';

interface PlanDetailedProps {
  id: string;
}
export const PlanDetailed = ({ id }: PlanDetailedProps) => {
  const { startCheckout } = useCheckout();
  const type = 'subscription';
  const { data: plan } = useFetchDataWithParam<Plan, string>({
    fetchFunction: getPlanById,
    param: id?.toString(),
  });
  const handleBuyBtn = async (planId: string, type: string) => {
    await startCheckout(planId, type);
  };
  if (!plan || Array.isArray(plan)) return null;
  return (
    <div className={styles.content}>
      <div className={styles.plan}>
        <div className={styles.info}>
          <h4>{plan?.title}</h4>
          <div className={styles.info}>
            <p> {plan.description}</p>

            <div className={styles.btn}>
              <div className={styles.price}>
                {' '}
                <p>Price:</p>
                {plan?.price} $
              </div>
              <Button text='Buy' onClick={() => handleBuyBtn(plan._id, type)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
