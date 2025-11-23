import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from '../service/UserService';
import { UserFormData } from '../components/personal-data/PersonalData';
interface UpdateUserPayload {
  id: string;
  data: UserFormData;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => {
      return UserService.updateUser(payload.data, payload.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth'],
      });
    },
  });
};
