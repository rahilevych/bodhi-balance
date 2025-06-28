import { render, screen } from '@testing-library/react';
import FAQ from './FAQ';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
const mockQuestions = [
  {
    _id: 'q1',
    question: 'What should I bring to a yoga class?',
    answer: 'You should bring a yoga mat, comfortable clothing, and water.',
  },
  {
    _id: 'q2',
    question: 'How often should I practice yoga to see results?',
    answer:
      'Practicing yoga 3-4 times a week can help you see noticeable results.',
  },
  {
    _id: 'q3',
    question: 'Can beginners do hot yoga?',
    answer:
      'Beginners can try hot yoga but should listen to their bodies and stay hydrated.',
  },
  {
    _id: 'q4',
    question: 'Is yoga suitable for people with back pain?',
    answer:
      'Yes, yoga can be beneficial for back pain, but it is best to consult a doctor first.',
  },
  {
    _id: 'q5',
    question: 'What is the difference between Hatha and Vinyasa yoga?',
    answer:
      'Hatha is slower-paced focusing on poses, while Vinyasa links movement with breath in a flow.',
  },
];
jest.mock('../../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));

jest.mock('../../services/questionService.ts', () => ({
  getAllFAQ: jest.fn(),
}));

jest.mock('react-spinners', () => ({
  BounceLoader: ({ loading }: { loading: boolean }) =>
    loading ? <div data-testid='loader'>Loading...</div> : null,
}));
jest.mock('../../services/authService.ts', () => ({
  getMe: jest.fn(),
}));
jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({ color: '#000' }),
}));

describe('FAQ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('shows questions ', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: mockQuestions,
      loading: false,
      error: null,
    });
    render(<FAQ />);

    mockQuestions.forEach((question) => {
      expect(screen.getByText(question.question)).toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { name: /faq/i }));
  });
  test('shows loader when loading is true and data is empty', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });
    render(<FAQ />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  test('shows try agin later when err is true and data is empty', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: new Error(),
    });
    render(<FAQ />);
    expect(
      screen.getByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });
});
