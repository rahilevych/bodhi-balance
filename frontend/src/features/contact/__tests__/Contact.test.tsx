import { render, screen } from '@testing-library/react';
import Contact from '../components/contact/Contact';

import { useInView } from 'react-intersection-observer';

jest.mock('../components/contact-form/ContactForm', () => ({
  ContactForm: () => <div>Mocked ContactForm</div>,
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

describe('Contact component', () => {
  beforeEach(() => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });
  });

  test('renders Contact component', () => {
    render(<Contact />);
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
    expect(screen.getByText(/mocked contactform/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('renders motion div with correct animation state', () => {
    render(<Contact />);
    const motionDiv = screen.getByText(/contact us/i).parentElement;
    expect(motionDiv).toHaveAttribute('initial', 'hidden');
  });
});
