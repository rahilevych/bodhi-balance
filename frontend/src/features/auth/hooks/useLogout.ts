import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';
import { useAppContext } from '../../../context/AppContext';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { setToken } = useAppContext();
  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
      queryClient.removeQueries({ queryKey: ['bookings', 'currentUser'] });
      queryClient.removeQueries({ queryKey: ['subscription', 'active'] });
      localStorage.removeItem('accessToken');
      setToken(null);
    },
  });
};
