import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, PropsWithChildren } from 'react';
import AuthService from '../service/AuthService';
import { renderHook } from '@testing-library/react';
import { useRegistration } from '../hooks/useRegistration';

jest.mock('../service/AuthService', () => ({
  registerUser: jest.fn(),
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
    const mockUser = {
      user: {
        id: 1,
        fullName: 'User',
        email: 'test@gmail.com',
        password: '123456',
      },
    };
    (AuthService.registerUser as jest.Mock).mockReturnValue(mockUser);
    const { result } = renderHook(() => useRegistration(), { wrapper });
    await act(async () => {
      result.current.mutate({
        fullName: 'User',
        email: 'test@gmail.com',
        password: '123456',
      });
    });
    expect(AuthService.registerUser).toHaveBeenCalledWith({
      fullName: 'User',
      email: 'test@gmail.com',
      password: '123456',
    });
  });
  test('updates queryClient data on success', async () => {
    const mockUser = {
      user: {
        id: 1,
        fullName: 'User',
        email: 'test@gmail.com',
        password: '123456',
      },
    };
    (AuthService.registerUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useRegistration(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({
        fullName: 'User',
        email: 'test@gmail.com',
        password: '123456',
      });
    });

    expect(queryClient.getQueryData(['currentUser'])).toEqual(mockUser.user);
  });
});
