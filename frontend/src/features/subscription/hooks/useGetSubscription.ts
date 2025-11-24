import { useQuery } from '@tanstack/react-query';
import { SubscriptionService } from '../service/SubscriptionService';

export const useGetSubscription = () => {
  return useQuery({
    queryKey: ['subscription', 'active'],
    queryFn: SubscriptionService.getSubscriptionByUserId,
    staleTime: 1000 * 60 * 5,
  });
};
