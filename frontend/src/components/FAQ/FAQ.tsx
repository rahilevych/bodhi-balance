import { Element } from 'react-scroll';
import styles from './FAQ.module.css';
import { QuestionType } from '../../types/Types';
import { getAllFAQ } from '../../services/questionService';
import { useAppContext } from '../../context/AppContext';
import { BounceLoader } from 'react-spinners';
import { Question } from './Question';
import { useFetchData } from '../../hooks/useFetchData';

const FAQ = () => {
  const {
    data: questions,
    loading,
    error,
  } = useFetchData<QuestionType>({ fetchFunction: getAllFAQ });
  const { color } = useAppContext();

  return (
    <Element name='faq'>
      <section id='faq' className={styles.faq}>
        <div className='container'>
          <h2>FAQ</h2>
          {loading ? (
            <BounceLoader color={color} loading={loading} />
          ) : error ? (
            <p>Something went wrong. Please try again later.</p>
          ) : questions.length > 0 ? (
            <div className={styles.content}>
              <div className={styles.questions}>
                {questions.map((question, index) => (
                  <Question
                    key={index}
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
          ) : (
            <p>No questions found</p>
          )}
        </div>
      </section>
    </Element>
  );
};

export default FAQ;
