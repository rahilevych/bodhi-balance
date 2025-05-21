import styles from './LogoutButton.module.css';
import { ConfirmationWindow } from '../modal/ConfirmationWindow';
import { logout } from '../../services/authService';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUser, setIsAuthenticated, setNotification } = useAppContext();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
      setNotification('You have been logged out successfully!');

      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    } catch (error: any) {
      setNotification('Logout failed. Please try again!');
    }
  };

  return (
    <>
      <p className={styles.button} onClick={() => setIsModalOpen(true)}>
        Log out
      </p>
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
