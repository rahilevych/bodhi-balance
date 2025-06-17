import { Link, useNavigate } from 'react-router-dom';
import styles from './Success.module.css';
import Button from '../../components/Button/Button';
import { FaCheckCircle } from 'react-icons/fa';

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
          <Button text='Go Home' onClick={() => navigate('/')} />
          <Button text=' View Bookings' onClick={() => navigate('/profile')} />
        </div>
      </div>
    </div>
  );
};
