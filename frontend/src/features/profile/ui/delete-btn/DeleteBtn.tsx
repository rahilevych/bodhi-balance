import Button from '../../../../shared/ui/button/Button';
import styles from './DeleteBtn.module.css';

interface DeleteBtnProps {
  onClick: (state: boolean) => void;
}
export const DeleteBtn = ({ onClick }: DeleteBtnProps) => {
  return (
    <Button className={styles.delete} onClick={() => onClick(true)}>
      Delete
    </Button>
  );
};
