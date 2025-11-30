import { useState } from 'react';
import styles from './Question.module.css';
import { FiChevronRight } from 'react-icons/fi';
type Props = {
  question: string;
  answer: string;
};
export const Question = ({ question, answer }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className={styles['question-item']}>
      <button
        className={`${styles.question} ${
          isOpened ? styles['question-opened'] : ''
        }`}
        onClick={() => setIsOpened(!isOpened)}>
        {question}
        <div>
          <FiChevronRight
            className={`${styles.icon} ${
              isOpened ? styles['icon-opened'] : ''
            } `}
          />
        </div>
      </button>
      <div
        data-testid='answer'
        className={`${styles.answer} ${
          isOpened ? styles['answer-opened'] : ''
        }`}>
        {answer}
      </div>
    </div>
  );
};
