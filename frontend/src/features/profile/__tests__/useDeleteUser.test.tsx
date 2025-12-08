import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserService from '../service/UserService';
import { useDeleteUser } from '../hooks/useDeleteUser';

jest.mock('../service/UserService', () => ({
  deleteUser: jest.fn(),
}));

describe('useDeleteUser', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  test('calls UserService.deleteUser', async () => {
    (UserService.deleteUser as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: createWrapper(),
    });

    await result.current.mutateAsync();

    expect(UserService.deleteUser).toHaveBeenCalledTimes(1);
  });

  test('removes currentUser query on success', async () => {
    const removeQueries = jest.fn();

    const queryClient = new QueryClient();
    queryClient.removeQueries = removeQueries;

    (UserService.deleteUser as jest.Mock).mockResolvedValue({});

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteUser(), { wrapper });

    await result.current.mutateAsync();

    expect(removeQueries).toHaveBeenCalledWith({
      queryKey: ['currentUser'],
    });
  });
});
