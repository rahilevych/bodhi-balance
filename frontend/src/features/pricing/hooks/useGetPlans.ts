import { useQuery } from '@tanstack/react-query';
import { PlanService } from '../service/PlanService';

export const useGetPlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: PlanService.getAllPlans,
  });
};
