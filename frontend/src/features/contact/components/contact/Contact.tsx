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
                src='https://i.pinimg.com/736x/d0/00/b8/d000b850c636e2f0afdb6b627f24a59a.jpg'
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
