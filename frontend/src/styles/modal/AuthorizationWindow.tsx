import { AiOutlineClose } from 'react-icons/ai';
import styles from './AuthorizationWindow.module.css';
import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

interface AuthorizationWindowProps {
  onClose: () => void;
  children: React.ReactNode;
}
export const AuthorizationWindow = ({
  onClose,
  children,
}: AuthorizationWindowProps) => {
  const { user } = useAppContext();

  useEffect(() => {
    if (user != null) {
      onClose();
    }
  }, [user]);

  return (
    <>
      {' '}
      <div className={styles['modal-overlay']} onClick={onClose}>
        <div
          className={styles['modal-content']}
          onClick={(e) => e.stopPropagation()}>
          <button className={styles['close-btn']} onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
