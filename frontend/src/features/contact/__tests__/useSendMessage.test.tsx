import { renderHook, act } from '@testing-library/react';
import { useSendMessage } from '../hooks/useSendMessage';
import { ContactService } from '../service/ContactService';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../service/ContactService');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useSendMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls onSuccess and shows success toast', async () => {
    (ContactService.sendMessage as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useSendMessage(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        fullName: 'User',
        email: 'user@gmail.com',
        message: 'Hello!',
      });
    });

    expect(ContactService.sendMessage).toHaveBeenCalledWith({
      fullName: 'User',
      email: 'user@gmail.com',
      message: 'Hello!',
    });
    expect(toast.success).toHaveBeenCalledWith('Message was sent successfully');
  });

  test('calls onError and shows error toast', async () => {
    (ContactService.sendMessage as jest.Mock).mockRejectedValueOnce(
      new Error('Server error'),
    );

    const { result } = renderHook(() => useSendMessage(), { wrapper });

    await act(async () => {
      await result.current
        .mutateAsync({
          fullName: 'User',
          email: 'user@gmail.com',
          message: 'Hello!',
        })
        .catch(() => {});
    });

    expect(ContactService.sendMessage).toHaveBeenCalledWith({
      fullName: 'User',
      email: 'user@gmail.com',
      message: 'Hello!',
    });
    expect(toast.error).toHaveBeenCalledWith('Try later, smth went wrong!');
  });
});
