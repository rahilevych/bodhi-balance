import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Question } from '../components/question/Question';
const mockQuestion = {
  _id: 'q1',
  question: 'What should I bring to a yoga class?',
  answer: 'You should bring a yoga mat, comfortable clothing, and water.',
};

describe('PlanDetailed', () => {
  test('render correctly plan data', () => {
    render(
      <Question
        question={mockQuestion.question}
        answer={mockQuestion.answer}
      />,
    );
    expect(
      screen.getByText('What should I bring to a yoga class?'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'You should bring a yoga mat, comfortable clothing, and water.',
      ),
    ).toBeInTheDocument();
  });
  test('clicking the question toggles the answer visibility', async () => {
    const user = userEvent.setup();

    render(
      <Question
        question={mockQuestion.question}
        answer={mockQuestion.answer}
      />,
    );

    const questionButton = screen.getByRole('button', {
      name: /what should i bring to a yoga class\?/i,
    });
    const answer = screen.getByTestId('answer');

    expect(answer.className).not.toMatch(/answer-opened/);

    await user.click(questionButton);

    expect(answer.className).toMatch(/answer-opened/);
  });
});
