import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AuthService.registerUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};
