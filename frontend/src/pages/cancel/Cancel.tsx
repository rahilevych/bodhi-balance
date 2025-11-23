import { useNavigate } from 'react-router-dom';
import styles from './Cancel.module.css';

import { AiFillCloseCircle } from 'react-icons/ai';
import Button from '../../shared/ui/button/Button';

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
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    </div>
  );
};
