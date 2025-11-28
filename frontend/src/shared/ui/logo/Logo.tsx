import { useNavigate } from 'react-router';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}
export const Logo = ({ className }: LogoProps) => {
  const navigate = useNavigate();
  return (
    <div
      data-testid='logo'
      className={styles.logo}
      onClick={() => {
        navigate('/');
      }}
    >
      <span className={className}>Bodhi balance</span>
    </div>
  );
};
