import { Authorization } from '../../features/auth/components/Authorization';
import styles from './AuthPage.module.css';

export const AuthPage = () => {
  return (
    <div className={styles.auth}>
      <div className='container'>
        <Authorization />
      </div>
    </div>
  );
};
