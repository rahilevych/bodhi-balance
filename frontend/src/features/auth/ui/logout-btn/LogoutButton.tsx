import styles from './LogoutButton.module.css';
import { ConfirmationWindow } from '../../../../styles/modal/ConfirmationWindow';
import { useState } from 'react';
import Button from '../../../../shared/ui/button/Button';
import { useLogout } from '../../hooks/useLogout';

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      <Button className={styles.button} onClick={() => setIsModalOpen(true)}>
        Log out
      </Button>
      <ConfirmationWindow
        isOpen={isModalOpen}
        message='Are you sure you want to log out?'
        onConfirm={() => {
          setIsModalOpen(false);
          handleLogout();
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default LogoutButton;
