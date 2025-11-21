import { Element, Link } from 'react-scroll';
import styles from './About.module.css';
import { aboutInfo } from '../../../../constants/about';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const container: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <Element name='about'>
      <section className={styles.about} ref={ref}>
        <motion.div
          className='container'
          variants={container}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className={styles.h2}>About us</h2>
          <motion.div
            className={styles.content}
            variants={staggerContainer}
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div className={styles.image} variants={item}>
              <img src={aboutInfo.img} alt='about-img' />
            </motion.div>
            <div className={styles.text}>
              <p>{aboutInfo.info}</p>
              <ul>
                {aboutInfo.links.map((link, index) => (
                  <motion.li key={index} variants={item}>
                    <Link to={link.link} className={styles.link} smooth={true}>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </Element>
  );
};
