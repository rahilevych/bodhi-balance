import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import AuthService from '../service/AuthService';
import { act, renderHook } from '@testing-library/react';
import { useLogin } from '../hooks/useLogin';

jest.mock('../service/AuthService', () => ({
  loginUser: jest.fn(),
}));
describe('useLogin hook', () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  test('calls loginUser on mutate', async () => {
    const mockUser = { user: { id: 1, name: 'User' } };
    (AuthService.loginUser as jest.Mock).mockReturnValue(mockUser);
    const { result } = renderHook(() => useLogin(), { wrapper });
    await act(async () => {
      result.current.mutate({
        email: 'test@gmail.com',
        password: '123456',
      });
    });
    expect(AuthService.loginUser).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: '123456',
    });
  });
  test('updates queryClient data on success', async () => {
    const mockUser = { user: { id: 10, name: 'Eva' } };
    (AuthService.loginUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useLogin(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({
        email: 'test@gmail.com',
        password: '123456',
      });
    });

    expect(queryClient.getQueryData(['currentUser'])).toEqual(mockUser.user);
  });
});
