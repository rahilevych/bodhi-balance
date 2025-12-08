import { render, screen } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../../../context/AppContext';
import Hero from '../components/hero/Hero';

jest.mock('../../../context/AppContext.tsx', () => ({
  useAppContext: jest.fn(),
}));
jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

describe('Hero component', () => {
  beforeEach(() => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });
  });

  it('renders headings', () => {
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });
    render(<Hero />);
    expect(screen.getByText('Bodhi')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
  });

  it('renders image on mobile', () => {
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Hero />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('unsplash'));
  });

  it('renders button with text', () => {
    (useAppContext as jest.Mock).mockReturnValue({ isMobile: false });
    render(<Hero />);
    expect(screen.getByText('Check classes')).toBeInTheDocument();
  });
});
