import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';
import { useAppContext } from '../../../context/AppContext';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setToken } = useAppContext();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      AuthService.loginUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      localStorage.setItem('accessToken', data.accessToken);
      setToken(data.accessToken);
    },
  });
};
