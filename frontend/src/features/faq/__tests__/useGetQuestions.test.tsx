import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QuestionService from '../service/QuestionService';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetQuestions } from '../hooks/useGetQuestions';

jest.mock('../service/QuestionService', () => ({ getAllFAQ: jest.fn() }));

const mockQuestions = [
  { question: 'Q1?', answer: 'A1' },
  { question: 'Q2?', answer: 'A2' },
];

describe('useGetQuestion', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('returns questions on success', async () => {
    (QuestionService.getAllFAQ as jest.Mock).mockResolvedValue(mockQuestions);

    const { result } = renderHook(() => useGetQuestions(), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockQuestions));
    expect(QuestionService.getAllFAQ).toHaveBeenCalled();
  });
});
