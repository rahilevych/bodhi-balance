import { useEffect } from 'react';
import styles from './NotificationWindow.module.css';

interface NotificationWindowProps {
  message: string;
  onClose: () => void;
}
export const NotificationWindow = ({
  message,
  onClose,
}: NotificationWindowProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={styles.notification}>{message}</div>;
};
