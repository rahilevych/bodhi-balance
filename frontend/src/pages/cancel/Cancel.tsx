import { useNavigate } from 'react-router-dom';
import styles from './Cancel.module.css';
import Button from '../../shared/button/Button';
import { AiFillCloseCircle } from 'react-icons/ai';

export const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.cancel}>
      <div className={styles.content}>
        <h1>
          {' '}
          <AiFillCloseCircle /> Booking Canceled!
        </h1>
        <p>Your booking process was canceled. No charges were made.</p>
        <div className={styles.actions}>
          <Button text='Go Home' onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
};
