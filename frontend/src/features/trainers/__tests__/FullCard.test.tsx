import { render, screen } from '@testing-library/react';
import { FullCard } from '../components/full-card/FullCard';

describe('FullCard', () => {
  const mockTrainer = {
    _id: '1',
    fullName: 'Anna Müller',
    experience: 5,
    specialization: 'Physiotherapy',
    about:
      'Anna has 5 years of experience in physiotherapy, specializing in sports injuries and rehabilitation.',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
  };

  test('renders correctly full card for trainers', () => {
    render(<FullCard currentTrainer={mockTrainer} />);
    expect(screen.getByAltText('trainer-img')).toBeInTheDocument();
    expect(screen.getByText('Anna Müller')).toBeInTheDocument();
    expect(screen.getByText('Physiotherapy')).toBeInTheDocument();
    expect(screen.getByText('5 years')).toBeInTheDocument();
  });
});
