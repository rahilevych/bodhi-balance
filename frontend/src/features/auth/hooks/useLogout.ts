import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
      queryClient.removeQueries({ queryKey: ['bookings', 'currentUser'] });
      queryClient.removeQueries({ queryKey: ['subscription', 'active'] });
    },
  });
};
