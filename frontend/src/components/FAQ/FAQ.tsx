import { Element } from 'react-scroll';
import styles from './FAQ.module.css';
import { Question } from './Question';
import { useEffect, useState } from 'react';
import { QuestionType } from '../../types/Types';
import { getAllFAQ } from '../../services/questionService';

const FAQ = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  useEffect(() => {
    const init = async () => {
      try {
        const data = await getAllFAQ();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };
    init();
  }, []);
  return (
    <Element name='faq'>
      <section id='faq' className={styles.faq}>
        <div className='container'>
          <h2>FAQ</h2>
          <div className={styles.content}>
            <div className={styles.questions}>
              {questions.map((question, index) => (
                <Question
                  question={question.question}
                  answer={question.answer}
                />
              ))}
            </div>
            <div className={styles.image}>
              <img
                src='https://i.pinimg.com/736x/23/4c/79/234c7989811ee5f64dc9c31471770537.jpg'
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default FAQ;
