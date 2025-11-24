import { useQuery } from '@tanstack/react-query';
import { ScheduleService } from '../service/ScheduleService';

export const useGetTrainingsDay = (date: Date) => {
  return useQuery({
    queryKey: ['schedule', date],
    queryFn: () => {
      return ScheduleService.getAllTrainingForDay(date);
    },
    staleTime: 1000 * 60 * 5,
  });
};
