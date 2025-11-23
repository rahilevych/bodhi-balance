import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from '../service/UserService';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['auth'],
      });
    },
  });
};
