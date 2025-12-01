/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter } from 'react-router';
import { useProfile } from '../../features/auth/hooks/useProfile';
import { render, screen } from '@testing-library/react';
import { AppRoutes } from '../routes/AppRoutes';
import { AppProvider } from '../../context/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../../shared/api/axiosInstance.ts', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

jest.mock('../../features/auth/hooks/useProfile');
const mockedUseProfile = useProfile as jest.Mock;

jest.mock('../../pages/auth/AuthPage', () => ({
  __esModule: true,
  AuthPage: () => <div>Sign In</div>,
}));

jest.mock('../../pages/profile/Profile', () => ({
  __esModule: true,
  default: () => <div>Profile Page</div>,
}));

jest.mock('../../pages/404/NotFound', () => ({
  __esModule: true,
  NotFound: () => <div>Not Found</div>,
}));
jest.mock('../../pages/landing/Landing', () => ({
  __esModule: true,
  default: () => <div>Landing Page</div>,
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div data-testid='swiper'>{children}</div>,
  SwiperSlide: ({ children }: any) => (
    <div data-testid='swiper-slide'>{children}</div>
  ),
}));
jest.mock('swiper/modules', () => ({
  Pagination: ({ children }: any) => (
    <div data-testid='pagination'>{children}</div>
  ),
}));
jest.mock('swiper/swiper-bundle.css', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css', () => ({}));

describe('App Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const queryClient = new QueryClient();
  test('redirects to /auth from /profile when user not logged in', () => {
    mockedUseProfile.mockReturnValue({ data: null, isPending: false });
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('renders  Profile page if user logged in', () => {
    mockedUseProfile.mockReturnValue({
      data: { id: 1, name: 'User' },
      isPending: false,
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });

  test('renders Auth page', () => {
    render(
      <MemoryRouter initialEntries={['/auth']}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
  test('renders Landing page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Landing Page')).toBeInTheDocument();
  });
  test('renders NotFound page for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
