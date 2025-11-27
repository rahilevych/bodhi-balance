import Button from '../../../../shared/ui/button/Button';
import { useCreateCheckoutSession } from '../../../payment/hooks/useCreateCheckoutSession';
import { useGetPlan } from '../../hooks/useGetPlan';
import styles from './PlanDetailed.module.css';

interface PlanDetailedProps {
  id: string;
}
export const PlanDetailed = ({ id }: PlanDetailedProps) => {
  const { mutate: startCheckout, isPending } = useCreateCheckoutSession();
  const type = 'subscription';

  const { data: plan } = useGetPlan(id);
  const handleBuyBtn = (planId: string, type: string) => {
    startCheckout({ productId: planId, type: type });
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
              <Button onClick={() => handleBuyBtn(plan._id, type)}>
                Buy {isPending ? 'Processing...' : 'Checkout'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
