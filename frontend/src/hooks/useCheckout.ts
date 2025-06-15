import { createCheckoutSession } from '../services/stripeService';

export const useCheckout = () => {
  const startCheckout = async (trainingId: string) => {
    try {
      const { url } = await createCheckoutSession(trainingId);
      window.location.href = url;
    } catch (err) {
      console.error('Error by payment:', err);
    }
  };

  return { startCheckout };
};
