import { useQuery } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useProfile = () => {
  const token = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      if (!token) return null;
      return AuthService.getMe();
    },
    enabled: !!token,
  });
};
