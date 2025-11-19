import { useNavigate } from 'react-router';
import styles from './Logo.module.css';

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      data-testid='logo'
      className={styles.logo}
      onClick={() => {
        navigate('/');
      }}
    >
      <span>Bodhi balance</span>
    </div>
  );
};
