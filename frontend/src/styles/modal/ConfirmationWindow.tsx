import Button from '../../shared/ui/button/Button';
import styles from './ConfirmationWindow.module.css';

interface ConfirmationWindowProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export const ConfirmationWindow = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmationWindowProps) => {
  if (!isOpen) return null;
  return (
    <div data-testid='confirm-window' className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <p>{message}</p>
        <div className={styles['modal-buttons']}>
          <div onClick={onConfirm}>
            {' '}
            <Button type='button' className={styles['confirm-btn']}>
              Yes
            </Button>
          </div>

          <div onClick={onCancel}>
            {' '}
            <Button type='button' className={styles['cancel-btn']}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
