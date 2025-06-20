import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { createCheckoutSession } from '../services/stripeService';
import { AxiosError, isAxiosError } from 'axios';

export const useCheckout = () => {
  const { setNotification, notification } = useAppContext();
  const navigate = useNavigate();
  const startCheckout = async (trainingId: string, type: string) => {
    try {
      const res = await createCheckoutSession(trainingId, type);

      if (res.url) {
        window.location.href = res.url;
      } else if (res.booking) {
        navigate('/success');
      }
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err);
        if (err.response?.data) {
          setNotification(err.response.data.message);
        } else {
          setNotification('Network or server error');
        }
      } else {
        console.error('Unknown error:', err);
        setNotification('Unexpected error occurred');
      }
    }
  };

  return { startCheckout };
};
