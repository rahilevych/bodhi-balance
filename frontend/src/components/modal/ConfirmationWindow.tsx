import Button from '../Button/Button';
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
            <Button
              text='Yes'
              type='button'
              className={styles['confirm-btn']}
            />
          </div>

          <div onClick={onCancel}>
            {' '}
            <Button
              text='Cancel'
              type='button'
              className={styles['cancel-btn']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
