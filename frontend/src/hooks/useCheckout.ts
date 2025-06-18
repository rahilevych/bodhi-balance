import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { createCheckoutSession } from '../services/stripeService';

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
      } else if (res.subscription) {
        setNotification(res.message);
      }
    } catch (err) {
      console.error('Error by payment:', err);
    }
  };

  return { startCheckout };
};
