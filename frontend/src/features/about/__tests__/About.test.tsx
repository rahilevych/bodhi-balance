import { render, screen } from '@testing-library/react';
import { aboutInfo } from '../../../constants/about';
import { About } from '../components/about/About';

jest.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: jest.fn(), inView: true }),
}));
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li {...props}>{children}</li>
    ),
  },
}));
jest.mock('react-scroll', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={`#${to}`}>{children}</a>
  ),
  Element: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('About', () => {
  test('renders About component', () => {
    render(<About />);

    expect(screen.getByText('About us')).toBeInTheDocument();
    expect(screen.getByAltText('about-img')).toHaveAttribute(
      'src',
      aboutInfo.img,
    );
    expect(
      screen.getByText((content) => content.includes(aboutInfo.info)),
    ).toBeInTheDocument();

    aboutInfo.links.forEach((link) => {
      const linkEl = screen.getByRole('link', {
        name: new RegExp(link.name.trim(), 'i'),
      });
      expect(linkEl).toBeInTheDocument();
      expect(linkEl).toHaveAttribute('href', `#${link.link}`);
    });
  });
});
