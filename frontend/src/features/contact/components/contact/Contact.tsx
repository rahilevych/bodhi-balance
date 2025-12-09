import { Element } from 'react-scroll';
import styles from './Contact.module.css';
import { ContactForm } from '../contact-form/ContactForm';
import { motion } from 'framer-motion';
import { container } from '../../../../animations/landing-variannts';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <Element name='contact'>
      <section className={styles.contact} id='contact' ref={ref}>
        <motion.div
          className='container'
          variants={container}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2>Contact us</h2>
          <div className={styles.content}>
            {' '}
            <div>
              {' '}
              <ContactForm />
            </div>
            <div className={styles.image}>
              <img
                src='https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='contact-img'
              />
            </div>
          </div>
        </motion.div>
      </section>
    </Element>
  );
};

export default Contact;
