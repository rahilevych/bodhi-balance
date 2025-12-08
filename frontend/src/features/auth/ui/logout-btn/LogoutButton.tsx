import styles from './LogoutButton.module.css';

import { useState } from 'react';
import Button from '../../../../shared/ui/button/Button';
import { useLogout } from '../../hooks/useLogout';
import { Loader } from '../../../../shared/ui/loader/Loader';
import { ConfirmationWindow } from '../../../../shared/modal/ConfirmationWindow';

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();
  const handleLogout = async () => {
    logout();
  };
  if (isPending) return <Loader />;
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
