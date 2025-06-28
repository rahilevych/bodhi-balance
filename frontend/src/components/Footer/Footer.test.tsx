import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { useAppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { sectionsList } from '../../constants/sections';
import userEvent from '@testing-library/user-event';
import { scroller } from 'react-scroll';

jest.mock('../../context/AppContext');
jest.mock('../../services/authService.ts', () => ({
  getMe: jest.fn(),
}));
jest.mock('react-scroll', () => ({
  scroller: {
    scrollTo: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  };
});

describe('Footer', () => {
  const mockedNavigate = jest.fn();
  const mockedScrollTo = scroller.scrollTo as jest.Mock;
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
  });

  test('render list of sections for navigation', () => {
    render(<Footer />);

    sectionsList.forEach((section) => {
      section.subSections.forEach((subSection) => {
        expect(screen.getByText(subSection.name)).toBeInTheDocument();
      });
    });
  });
  test('scrolls to section when on homepage', async () => {
    render(<Footer />);
    for (const section of sectionsList) {
      for (const subSection of section.subSections) {
        const link = screen.getByText(subSection.name);
        await user.click(link);
        expect(mockedScrollTo).toHaveBeenCalledWith(subSection.link, {
          duration: 500,
          smooth: true,
        });
        expect(mockedNavigate).not.toHaveBeenCalled();
      }
    }
  });
  test('navigates to homepage with scrollTo when not on homepage', async () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/profile' });

    render(<Footer />);

    const subSection = sectionsList[0].subSections[0];
    const link = screen.getByText(subSection.name);
    await user.click(link);

    expect(mockedNavigate).toHaveBeenCalledWith('/', {
      state: { scrollTo: subSection.link },
    });
    expect(mockedScrollTo).not.toHaveBeenCalled();
  });
});
