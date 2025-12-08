import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { fullName: string; email: string; password: string }) =>
      AuthService.registerUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};
