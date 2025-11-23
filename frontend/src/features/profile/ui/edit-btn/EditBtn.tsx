import React from 'react';
import styles from './EditBtn.module.css';
import Button from '../../../../shared/ui/button/Button';

interface EditBtnProps {
  onEdit: (state: boolean) => void;
}
export const EditBtn = ({ onEdit }: EditBtnProps) => {
  return (
    <Button className={styles.btn} onClick={() => onEdit(true)}>
      Edit
    </Button>
  );
};
