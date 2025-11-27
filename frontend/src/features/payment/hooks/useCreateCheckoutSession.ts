/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { PaymentService } from '../service/PaymentService';
import { useNavigate } from 'react-router';
type CheckoutParams = {
  productId: string;
  type: string;
};
export const useCreateCheckoutSession = () => {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ productId, type }: CheckoutParams) => {
      return PaymentService.createCheckoutSession(productId, type);
    },
    onSuccess: (res: any) => {
      if (res.url) {
        window.location.href = res.url;
      } else if (res.booking) {
        navigate('/success');
      }
    },
  });
};
