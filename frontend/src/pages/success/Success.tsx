import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';

import { FaCheckCircle } from 'react-icons/fa';
import Button from '../../shared/ui/button/Button';
import { refreshAccessToken } from '../../utils/refreshAccessToken';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Loader } from '../../shared/ui/loader/Loader';

export const Success = () => {
  const navigate = useNavigate();
  const { setToken, setIsAuth } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = await refreshAccessToken();
      if (token) {
        setToken(token);
        setIsAuth(true);
        localStorage.setItem('accessToken', token);
      }
      setLoading(false);
    };

    initAuth();
  }, [setToken, setIsAuth]);

  if (loading) return <Loader />;
  return (
    <div className={styles.success}>
      <div className={styles.content}>
        <h1>
          {' '}
          <FaCheckCircle /> Success!
        </h1>
        <p>Your booking has been confirmed.</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate('/')}>Go Home</Button>
          <Button onClick={() => navigate('/profile')}>View Bookings</Button>
        </div>
      </div>
    </div>
  );
};
