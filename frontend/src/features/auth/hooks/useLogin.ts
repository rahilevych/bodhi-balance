import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], data);
    },
  });
};
