import { useQuery } from '@tanstack/react-query';
import { TrainersService } from '../service/TrainersService';

export const useGetTrainers = () => {
  return useQuery({
    queryKey: ['trainers'],
    queryFn: TrainersService.getAllTrainers,
    staleTime: 1000 * 60 * 5,
  });
};
