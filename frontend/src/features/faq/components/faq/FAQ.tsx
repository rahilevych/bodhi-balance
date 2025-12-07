import { Element } from 'react-scroll';
import styles from './FAQ.module.css';
import { QuestionType } from '../../../../types/Types';
import { Question } from '../question/Question';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  container,
  item,
  staggerContainer,
} from '../../../../animations/landing-variannts';
import { useGetQuestions } from '../../hooks/useGetQuestions';
import { FAQSkeleton } from './FAQSkeleton';

const FAQ = () => {
  const { data: questions, isPending } = useGetQuestions();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  if (isPending) return <FAQSkeleton />;
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
              {questions &&
                questions.map((question: QuestionType, index: number) => (
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
                src='https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='faq-img'
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </Element>
  );
};

export default FAQ;
