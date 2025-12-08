import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProfile } from '../hooks/useProfile';
import AuthService from '../service/AuthService';

jest.mock('../service/AuthService', () => ({ getMe: jest.fn() }));

describe('useProfile hook', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  test('fetches and returns user data', async () => {
    const mockUser = { id: 1, name: 'User' };
    (AuthService.getMe as jest.Mock).mockResolvedValue(mockUser);
    const { result } = renderHook(() => useProfile(), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(mockUser));
    expect(AuthService.getMe).toHaveBeenCalled();
  });
});
