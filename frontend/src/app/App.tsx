import '../styles/null.css';
import '../styles/global.css';
import { AppRoutes } from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { refreshAccessToken } from '../utils/refreshAccessToken';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { setLogoutNavigate } from '../shared/api/axiosInstance';

function App() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setToken } = useAppContext();
  useEffect(() => {
    const initAuth = async () => {
      const token = await refreshAccessToken();
      if (token) {
        localStorage.setItem('accessToken', token);
        setToken(token);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      }
    };

    initAuth();
  }, []);
  useEffect(() => {
    setLogoutNavigate(() => navigate('/auth'));
  }, [navigate]);
  return (
    <div className='wrapper'>
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
