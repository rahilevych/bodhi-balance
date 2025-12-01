import { convertDateToString } from '../../../../utils/dateHelpers';
import styles from './Subscription.module.css';
import { useGetSubscription } from '../../hooks/useGetSubscription';

export const SubscriptionSection = () => {
  const { data: subscription, isPending } = useGetSubscription();
  if (isPending) return <p>Loading...</p>;

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
