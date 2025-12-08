import { render, screen } from '@testing-library/react';

import { useProfile } from '../../auth/hooks/useProfile';
import { LaptopMenu } from '../components/laptop-menu/LaptopMenu';

const navigateMock = jest.fn();
const locationMock = { pathname: '/' };
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
}));

jest.mock('../../auth/hooks/useProfile.ts', () => ({
  useProfile: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('../../auth/hooks/useLogout.ts', () => ({
  useLogout: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));
jest.mock('../../auth/ui/logout-btn/LogoutButton.tsx', () => () => (
  <button>Log out</button>
));

jest.mock('../../../shared/ui/dropdown/Dropdown.tsx', () => ({
  Dropdown: () => <div>Dropdown</div>,
}));
describe('LaptopMenu', () => {
  test('renders correctly component when user not logged in', () => {
    (useProfile as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
    });
    render(<LaptopMenu />);
    expect(screen.getAllByText(/dropdown/i)).toHaveLength(3);
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });
  test('renders correctly component when user logged in', () => {
    (useProfile as jest.Mock).mockReturnValue({
      data: { user: { id: '1', fullName: 'Test user' } },
      isPending: false,
    });
    render(<LaptopMenu />);
    expect(screen.getAllByText(/dropdown/i)).toHaveLength(3);
    expect(
      screen.getByRole('button', { name: /log out/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /profile/i }),
    ).toBeInTheDocument();
  });
  test('navigates to profile when clicking Profile button', () => {
    (useProfile as jest.Mock).mockReturnValue({
      data: { user: { id: '1', fullName: 'Test user' } },
      isPending: false,
    });

    render(<LaptopMenu />);

    screen.getByRole('button', { name: /profile/i }).click();
    expect(navigateMock).toHaveBeenCalledWith('/profile');
  });
  test('navigates to /auth when clicking Sign in', () => {
    (useProfile as jest.Mock).mockReturnValue({ data: null });

    render(<LaptopMenu />);

    screen.getByRole('button', { name: /sign in/i }).click();
    expect(navigateMock).toHaveBeenCalledWith('/auth');
  });
});
