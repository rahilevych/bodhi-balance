import { useQuery } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useProfile = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: AuthService.getMe,
    staleTime: 1000 * 60 * 5,
  });
};
