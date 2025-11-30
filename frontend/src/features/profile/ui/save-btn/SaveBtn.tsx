import Button from '../../../../shared/ui/button/Button';
import styles from './SaveBtn.module.css';

export const SaveBtn = () => {
  return (
    <Button type='submit' className={styles.confirm}>
      Save
    </Button>
  );
};
