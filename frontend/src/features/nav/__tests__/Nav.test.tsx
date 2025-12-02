import { render, screen } from '@testing-library/react';
import { useAppContext } from '../../../context/AppContext';
import Nav from '../components/nav/Nav';

jest.mock('../../../context/AppContext', () => ({
  useAppContext: jest.fn(),
}));

jest.mock('../../../shared/ui/logo/Logo', () => ({
  Logo: () => <div>Logo</div>,
}));

jest.mock('../../menu/components/laptop-menu/LaptopMenu', () => ({
  LaptopMenu: () => <div>LaptopMenu</div>,
}));

jest.mock('../../menu/components/mobile-menu/MobileMenu', () => ({
  MobileMenu: () => <div>MobileMenu</div>,
}));

describe('Nav component', () => {
  it('renders Logo', () => {
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });
    render(<Nav />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders LaptopMenu when not mobile', () => {
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });
    render(<Nav />);
    expect(screen.getByText('LaptopMenu')).toBeInTheDocument();
    expect(screen.queryByText('MobileMenu')).not.toBeInTheDocument();
  });

  it('renders MobileMenu when mobile', () => {
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Nav />);
    expect(screen.getByText('MobileMenu')).toBeInTheDocument();
    expect(screen.queryByText('LaptopMenu')).not.toBeInTheDocument();
  });
});
