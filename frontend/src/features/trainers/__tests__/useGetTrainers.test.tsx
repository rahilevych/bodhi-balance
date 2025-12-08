import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { TrainersService } from '../service/TrainersService';
import { useGetTrainers } from '../hooks/useGetTrainers';
import { Trainer } from '../../../types/Types';

jest.mock('../service/TrainersService');

describe('useGetTrainers', () => {
  const mockTrainers: Trainer[] = [
    {
      _id: '1',
      fullName: 'Anna Müller',
      experience: 5,
      specialization: 'Physiotherapy',
      about:
        'Anna has 5 years of experience in physiotherapy, specializing in sports injuries and rehabilitation.',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      _id: '2',
      fullName: 'Maximilian Schmidt',
      experience: 8,
      specialization: 'Strength & Conditioning',
      about:
        'Maximilian focuses on improving athletic performance and personalized training plans.',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      _id: '3',
      fullName: 'Laura Fischer',
      experience: 3,
      specialization: 'Yoga & Mindfulness',
      about:
        'Laura combines yoga and mindfulness practices to help clients improve flexibility and reduce stress.',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('fetches and returns subscription data', async () => {
    (TrainersService.getAllTrainers as jest.Mock).mockResolvedValue(
      mockTrainers,
    );

    const { result } = renderHook(() => useGetTrainers(), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(mockTrainers));
    expect(TrainersService.getAllTrainers).toHaveBeenCalledTimes(1);
  });
});
