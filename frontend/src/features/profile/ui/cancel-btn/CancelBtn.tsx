import Button from '../../../../shared/ui/button/Button';
import styles from './CancelBtn.module.css';
interface CancelBtnProps {
  onEditing: (state: boolean) => void;
}
export const CancelBtn = ({ onEditing }: CancelBtnProps) => {
  return (
    <Button
      type='button'
      className={styles.cancel}
      onClick={() => onEditing(false)}
    >
      Cancel
    </Button>
  );
};
