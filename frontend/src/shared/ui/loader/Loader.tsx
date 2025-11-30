import { BounceLoader } from 'react-spinners';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <BounceLoader
        color='rgb(128, 112, 135)'
        size={50}
        aria-label='Loading Spinner'
        data-testid='loader'
        className={styles.loader}
      />
    </div>
  );
};
