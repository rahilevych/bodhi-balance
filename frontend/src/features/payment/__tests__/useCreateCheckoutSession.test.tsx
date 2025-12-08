/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';
import { useCreateCheckoutSession } from '../hooks/useCreateCheckoutSession';
import { PaymentService } from '../service/PaymentService';
import { useNavigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../service/PaymentService');
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('useCreateCheckoutSession', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  let navigateMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  test('calls mutationFn with correct params', async () => {
    const mutateFnMock = jest
      .fn()
      .mockResolvedValue({ url: 'https://test.com' });
    (PaymentService.createCheckoutSession as jest.Mock).mockImplementation(
      mutateFnMock,
    );

    const { result } = renderHook(() => useCreateCheckoutSession(), {
      wrapper,
    });

    await result.current.mutateAsync({ productId: '1', type: 'test' });

    expect(PaymentService.createCheckoutSession).toHaveBeenCalledWith(
      '1',
      'test',
    );
  });

  test('redirects to url if res.url exists', async () => {
    const mockUrl = 'https://checkout.com';
    (PaymentService.createCheckoutSession as jest.Mock).mockResolvedValue({
      url: mockUrl,
    });

    const { result } = renderHook(() => useCreateCheckoutSession(), {
      wrapper,
    });

    delete (window as any).location;
    (window as any).location = { href: '' };

    await result.current.mutateAsync({ productId: '1', type: 'test' });

    expect(window.location.href).toBe(mockUrl);
  });

  test('navigates to /success if res.booking exists', async () => {
    (PaymentService.createCheckoutSession as jest.Mock).mockResolvedValue({
      booking: {},
    });

    const { result } = renderHook(() => useCreateCheckoutSession(), {
      wrapper,
    });

    await result.current.mutateAsync({ productId: '1', type: 'test' });

    expect(navigateMock).toHaveBeenCalledWith('/success');
  });
});
