import { useQuery } from '@tanstack/react-query';
import QuestionService from '../service/QuestionService';

export const useGetQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: QuestionService.getAllFAQ,
  });
};
