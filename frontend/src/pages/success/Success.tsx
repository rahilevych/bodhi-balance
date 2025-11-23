import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';

import { FaCheckCircle } from 'react-icons/fa';
import Button from '../../shared/ui/button/Button';

export const Success = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.success}>
      <div className={styles.content}>
        <h1>
          {' '}
          <FaCheckCircle /> Success!
        </h1>
        <p>Your booking has been confirmed.</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate('/')}>Go Home</Button>
          <Button onClick={() => navigate('/profile')}>View Bookings</Button>
        </div>
      </div>
    </div>
  );
};
