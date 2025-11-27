import { useQuery } from '@tanstack/react-query';

import { StylesService } from '../services/StylesService';

export const useGetAllStyles = () => {
  return useQuery({
    queryKey: ['styles'],
    queryFn: StylesService.getAllStyles,
    // staleTime: 1000 * 60 * 5,
    staleTime: 0,
  });
};
