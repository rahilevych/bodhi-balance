import { BounceLoader } from 'react-spinners';
import { useAppContext } from '../../../../context/AppContext';
import { useFetchDataWithParam } from '../../../../hooks/useFetchDataWithParam';
import { getSubscriptionByUserId } from '../../../../services/subscriptionService';
import { Subscription } from '../../../../types/Types';
import { convertDateToString } from '../../../../utils/dateHelpers';
import styles from './Subscription.module.css';

export const SubscriptionSection = () => {
  const { user, color } = useAppContext();
  const {
    data: subscription,
    loading,
    error,
  } = useFetchDataWithParam<Subscription, string>({
    fetchFunction: getSubscriptionByUserId,
    param: user?._id,
  });

  if (loading) {
    return (
      <div className={styles.centered}>
        <BounceLoader data-testid='loader' color={color} loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        Failed to load subscription. Please try again later.
      </div>
    );
  }

  if (!subscription || Array.isArray(subscription)) {
    return (
      <div className={styles.centered}>You don't have active subscriptions</div>
    );
  }
  return (
    <div className={styles.plan}>
      <ul className={styles.info}>
        <li>
          <strong>Plan name:</strong> {subscription.type.title}
        </li>
        <li>
          <strong>Status:</strong> {subscription.status}
        </li>
        {subscription.type.type === 'unlimited' ? (
          <li>
            <strong>Valid Until:</strong>{' '}
            {convertDateToString(subscription.validUntil)}
          </li>
        ) : (
          <li>
            <strong>Number of remaining trainings:</strong>{' '}
            {subscription.remainingTrainings}
          </li>
        )}
      </ul>
    </div>
  );
};
