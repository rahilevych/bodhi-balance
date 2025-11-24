import { useQuery } from '@tanstack/react-query';
import { ScheduleService } from '../service/ScheduleService';

export const useGetTrainingById = (id: string) => {
  return useQuery({
    queryKey: ['schedule', id],
    queryFn: () => {
      return ScheduleService.getTrainingById(id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
