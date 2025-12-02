import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      AuthService.loginUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};
