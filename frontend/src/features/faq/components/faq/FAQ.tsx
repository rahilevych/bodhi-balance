import { Element } from 'react-scroll';
import styles from './FAQ.module.css';
import { QuestionType } from '../../../../types/Types';
import { getAllFAQ } from '../../../../services/questionService';
import { Question } from '../question/Question';
import { useFetchData } from '../../../../hooks/useFetchData';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  container,
  item,
  staggerContainer,
} from '../../../../animations/landing-variannts';

const FAQ = () => {
  const { data: questions } = useFetchData<QuestionType>({
    fetchFunction: getAllFAQ,
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <Element name='faq'>
      <section id='faq' className={styles.faq} ref={ref}>
        <motion.div
          className='container'
          variants={container}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2>FAQ</h2>
          <motion.div
            className={styles.content}
            variants={staggerContainer}
            animate={inView ? 'visible' : 'hidden'}
          >
            <ul className={styles.questions}>
              {questions.map((question, index) => (
                <motion.li variants={item} key={index}>
                  <Question
                    question={question.question}
                    answer={question.answer}
                  />
                </motion.li>
              ))}
            </ul>
            <motion.div className={styles.image} variants={item}>
              <img
                src='https://i.pinimg.com/736x/23/4c/79/234c7989811ee5f64dc9c31471770537.jpg'
                alt=''
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </Element>
  );
};

export default FAQ;
