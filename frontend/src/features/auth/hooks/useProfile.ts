import { useQuery } from '@tanstack/react-query';
import AuthService from '../service/AuthService';

export const useProfile = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: AuthService.getMe,
    refetchOnMount: true,
  });
};
