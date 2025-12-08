/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react';
import { MobileMenu } from '../components/mobile-menu/MobileMenu';

const navigateMock = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => navigateMock,
}));
jest.mock('../ui/menu-toggle/MenuToggle', () => ({
  MenuToggle: ({ toggle }: { toggle: () => void }) => (
    <button onClick={toggle}>MenuToggle</button>
  ),
}));

jest.mock('../ui/navigation/Navigation', () => ({
  Navigation: ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => (
    <div>Navigation</div>
  ),
}));

describe('MobileMenu component', () => {
  test('renders correctly mobile menu', () => {
    render(<MobileMenu />);
    expect(screen.getByText(/navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/menutoggle/i)).toBeInTheDocument();
  });
});
