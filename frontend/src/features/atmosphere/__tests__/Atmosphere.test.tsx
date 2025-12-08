import Atmosphere from '../components/atmosphere/Atmosphere';
import { render, screen } from '@testing-library/react';

describe('Atmosphere', () => {
  test('renders Atmosphere component', () => {
    render(<Atmosphere />);
    expect(screen.getByText(/atmosphere/i)).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
