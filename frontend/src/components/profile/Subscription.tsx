import styles from './Subscription.module.css';
export const Subscription = () => {
  return (
    <div className={styles.plan}>
      <ul className={styles.info}>
        <li>
          <strong>Plan name:</strong>{' '}
        </li>
        <li>
          <strong>Status: </strong>
        </li>
        <li>
          <strong>Start day: </strong>
        </li>
        <li>
          <strong>Plan duration: </strong>
        </li>
        <li>
          <strong>End day:</strong>{' '}
        </li>
        <li>
          <strong>Amount:</strong>
        </li>
        <li>
          <strong>Payment Method: </strong>
        </li>
      </ul>
    </div>
  );
};
