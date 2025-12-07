import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQ from '../components/faq/FAQ';
import { useGetQuestions } from '../hooks/useGetQuestions';

jest.mock('../hooks/useGetQuestions');

const mockQuestions = [
  { question: 'Q1?', answer: 'A1' },
  { question: 'Q2?', answer: 'A2' },
];

describe('FAQ Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders skeleton while loading', () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      data: null,
      isPending: true,
    });

    render(<FAQ />);
    expect(screen.getByTestId('faq-skeleton')).toBeInTheDocument();
  });

  test('renders questions after loading', () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      data: mockQuestions,
      isPending: false,
    });

    render(<FAQ />);

    mockQuestions.forEach((q) => {
      expect(screen.getByText(q.question)).toBeInTheDocument();
      expect(screen.getByText(q.answer)).toBeInTheDocument();
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
