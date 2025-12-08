import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import AuthService from '../service/AuthService';
import { useLogout } from '../hooks/useLogout';
import { act, renderHook } from '@testing-library/react';

jest.mock('../service/AuthService.ts', () => ({
  logout: jest.fn(),
}));

describe('useLogout hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  test('calls logout on mutate', async () => {
    (AuthService.logout as jest.Mock).mockReturnValue({});
    const { result } = renderHook(() => useLogout(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync();
    });
    expect(AuthService.logout).toHaveBeenCalled();
    expect(queryClient.getQueryData(['currentUser'])).toBeNull();
  });
});
