import { render, screen } from '@testing-library/react';
import { useProfile } from '../../features/auth/hooks/useProfile';
import ProtectedRoute from '../routes/ProtectedRoute';
import { MemoryRouter, Route, Routes } from 'react-router';

jest.mock('../../shared/api/axiosInstance.ts', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

jest.mock('../../features/auth/hooks/useProfile.ts');
const mockedUseProfile = useProfile as jest.Mock;

describe('ProtectedRoutes', () => {
  test('should reder loader while loading state', () => {
    mockedUseProfile.mockReturnValue({
      data: null,
      isPending: true,
    });
    render(<ProtectedRoute element={<div>Profile Page</div>} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  test('should reder page when user exist', () => {
    mockedUseProfile.mockReturnValue({
      data: { id: '1', name: 'User' },
      isPending: false,
    });
    render(<ProtectedRoute element={<div>Profile Page</div>} />);
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });
  test('redirect to /auth when user not found', () => {
    mockedUseProfile.mockReturnValue({ data: null, isPending: false });
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path='/profile'
            element={<ProtectedRoute element={<div>Profile</div>} />}
          />
          <Route path='/auth' element={<div>Sign In</div>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
