import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';
import { useAppContext } from '../../../context/AppContext';

export const useRegistration = () => {
  const queryClient = useQueryClient();
  const { setToken } = useAppContext();
  return useMutation({
    mutationFn: (data: { fullName: string; email: string; password: string }) =>
      AuthService.registerUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      localStorage.setItem('accessToken', data.accessToken);
      setToken(data.accessToken);
    },
  });
};
