import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserService from '../service/UserService';
import { useUpdateUser } from '../hooks/useUpdateUser';

jest.mock('../service/UserService');

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUpdateUser', () => {
  const mockInvalidate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (UserService.updateUser as jest.Mock).mockResolvedValue({});
    QueryClient.prototype.invalidateQueries = mockInvalidate;
  });

  test('calls UserService.updateUser with correct arguments', async () => {
    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    const payload = {
      id: '123',
      data: { name: 'John', email: 'john@mail.com' },
    };

    await result.current.mutateAsync(payload);

    expect(UserService.updateUser).toHaveBeenCalledTimes(1);
    expect(UserService.updateUser).toHaveBeenCalledWith(
      payload.data,
      payload.id,
    );
  });

  test('invalidates "currentUser" query on success', async () => {
    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    await result.current.mutateAsync({
      id: '123',
      data: { name: 'John', email: 'john@mail.com' },
    });

    expect(mockInvalidate).toHaveBeenCalledWith({
      queryKey: ['currentUser'],
    });
  });
});
