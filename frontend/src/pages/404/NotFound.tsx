import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import Button from '../../components/Button/Button';
import { FaTimesCircle } from 'react-icons/fa';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notfound}>
      <div className={styles.content}>
        <h1>
          {' '}
          <FaTimesCircle /> 404 - Page Not Found
        </h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <div className={styles.actions}>
          <Button text='Go Home' onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
};
