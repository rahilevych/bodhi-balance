import { useMutation } from '@tanstack/react-query';
import { ContactService } from '../service/ContactService';
import { toast } from 'react-toastify';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: { fullName: string; email: string; message: string }) =>
      ContactService.sendMessage(data),

    onSuccess: () => {
      toast.success('Message was sent successfully');
    },
    onError: () => {
      toast.error('Try later, smth went wrong!');
    },
  });
};
