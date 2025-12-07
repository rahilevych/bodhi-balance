import { render, screen, fireEvent } from '@testing-library/react';

import { scroller } from 'react-scroll';
import { useNavigate } from 'react-router';
import { MenuItem } from '../ui/menu-item/MenuItem';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-scroll', () => ({
  scroller: { scrollTo: jest.fn() },
}));

describe('MenuItem component', () => {
  const mockSetIsOpen = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const item = { name: 'Test Section', link: 'test-section' };

  test('renders correctly', () => {
    render(<MenuItem item={item} setIsOpen={mockSetIsOpen} />);
    expect(screen.getByText(/test section/i)).toBeInTheDocument();
  });

  test('calls setIsOpen on click', () => {
    render(<MenuItem item={item} setIsOpen={mockSetIsOpen} />);
    const element = screen.getByText(/test section/i);
    fireEvent.click(element);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  test('calls navigate if pathname is not "/"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/other' },
      writable: true,
    });

    render(<MenuItem item={item} setIsOpen={mockSetIsOpen} />);
    const element = screen.getByText(/test section/i);
    fireEvent.click(element);
    expect(mockNavigate).toHaveBeenCalledWith('/', {
      state: { scrollTo: 'test-section' },
    });
    expect(scroller.scrollTo).not.toHaveBeenCalled();
  });

  test('calls scroller.scrollTo if pathname is "/"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true,
    });

    render(<MenuItem item={item} setIsOpen={mockSetIsOpen} />);
    const element = screen.getByText(/test section/i);
    fireEvent.click(element);
    expect(scroller.scrollTo).toHaveBeenCalledWith('test-section', {
      smooth: true,
      duration: 500,
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
