import { useMutation } from '@tanstack/react-query';
import { ContactService } from '../service/ContactService';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: ContactService.sendMessage,
  });
};
