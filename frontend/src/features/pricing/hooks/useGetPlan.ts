import { useQuery } from '@tanstack/react-query';
import { PlanService } from '../service/PlanService';

export const useGetPlan = (id: string) => {
  return useQuery({
    queryKey: ['plans', id],
    queryFn: () => {
      return PlanService.getPlanById(id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
