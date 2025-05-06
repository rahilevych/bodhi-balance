import { AiOutlineClose } from 'react-icons/ai';
import styles from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal = ({ onClose, children }: ModalProps) => {
  return (
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
  );
};
