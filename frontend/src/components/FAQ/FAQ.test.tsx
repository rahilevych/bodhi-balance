import { render, screen } from '@testing-library/react';
import FAQ from './FAQ';
import '@testing-library/jest-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { questionsMock } from '../../__mocks__/questionsMock';

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
      data: questionsMock,
      loading: false,
      error: null,
    });
    render(<FAQ />);

    questionsMock.forEach((question) => {
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
