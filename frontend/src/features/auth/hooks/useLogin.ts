import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService from '../service/AuthService';
import { useAppContext } from '../../../context/AppContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setToken, setIsAuth } = useAppContext();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      AuthService.loginUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      localStorage.setItem('accessToken', data.accessToken);
      setToken(data.accessToken);
      setIsAuth(true);
    },
    onError: (error: AxiosError) => {
      if (!error.response) {
        toast.error('Network error, check your connection!');
        return;
      }
      const data = error.response.data as { message?: string };
      switch (error.response?.status) {
        case 401:
          toast.error('Invalid login or password');
          break;
        case 500:
          toast.error('Server unavaliable, try again later');
          break;
        default:
          toast.error(data.message || 'An unexpected error occurred');
      }
    },
  });
};
