import { render, screen } from '@testing-library/react';
import Nav from '../nav/Nav';
import { useAppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { sectionsList } from '../../../constants/sections';
import userEvent from '@testing-library/user-event';

jest.mock('../../context/AppContext');
jest.mock('../../services/authService.ts', () => ({
  getMe: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Nav', () => {
  const mockOpenModal = jest.fn();
  const mockNavigate = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      openModal: mockOpenModal,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders menu sections', () => {
    render(<Nav />);
    sectionsList.forEach((section) => {
      expect(screen.getByText(section.name)).toBeInTheDocument();
    });
    expect(screen.getByText(/Bodhi balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
  test('shows subsections when main section is clicked', async () => {
    render(<Nav />);
    for (const section of sectionsList) {
      const mainSection = screen.getByText(section.name);
      await user.click(mainSection);
      for (const subSection of section.subSections) {
        expect(screen.getByText(subSection.name)).toBeInTheDocument();
      }
    }
  });
  test('burger menu toggles open and close', async () => {
    render(<Nav />);
    const burger = screen.getByTestId('burger');

    expect(screen.getByTestId('burger-menu')).not.toHaveClass('menu_opened');

    await user.click(burger);
    expect(screen.getByTestId('burger-menu')).toHaveClass('menu_opened');

    await user.click(burger);
    expect(screen.getByTestId('burger-menu')).not.toHaveClass('menu_opened');
  });
  test('sign in button opens modal window', async () => {
    render(<Nav />);
    const signInBtn = screen.getByText(/sign in/i);
    await user.click(signInBtn);
    expect(mockOpenModal).toHaveBeenCalled();
  });
  test('logo click navigates to "/"', async () => {
    render(<Nav />);
    await user.click(screen.getByTestId('logo'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  test('render "profile" and "logout " buttons if user authenticated', () => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });
    render(<Nav />);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });
  test('profile button opens modal redirect to profile page', async () => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });
    render(<Nav />);

    await user.click(screen.getByText(/profile/i));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
});
