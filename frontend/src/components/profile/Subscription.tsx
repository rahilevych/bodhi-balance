import { useAppContext } from '../../context/AppContext';
import { useFetchDataWithParam } from '../../hooks/useFetchDataWithParam';
import { getSubscriptionByUserId } from '../../services/subscriptionService';
import { Subscription } from '../../types/Types';
import { convertDateToString } from '../../utils/dateHelpers';
import styles from './Subscription.module.css';
export const SubscriptionSection = () => {
  const { user } = useAppContext();
  const {
    data: subscription,
    loading,
    error,
  } = useFetchDataWithParam<Subscription, string>({
    fetchFunction: getSubscriptionByUserId,
    param: user?._id,
  });

  if (Array.isArray(subscription)) return null;
  return (
    <>
      {subscription ? (
        <div className={styles.plan}>
          <ul className={styles.info}>
            <li>
              <strong>Plan name:</strong>
              {subscription?.type.title}
            </li>
            <li>
              <strong>Status: </strong>
              {subscription.status}
            </li>
            {subscription.type.type === 'unlimited' ? (
              <li>
                <strong>Valid Until: </strong>{' '}
                {convertDateToString(subscription.validUntil)}
              </li>
            ) : (
              <>
                <li>
                  <strong>Number of remaining trainings:</strong>
                  {subscription.remainingTrainings}
                </li>
              </>
            )}
          </ul>
        </div>
      ) : (
        <div> You don't have active subscriptions</div>
      )}
    </>
  );
};
