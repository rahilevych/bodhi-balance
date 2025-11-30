import { Element, Link } from 'react-scroll';
import styles from './About.module.css';
import { aboutInfo } from '../../../../constants/about';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  container,
  item,
  staggerContainer,
} from '../../../../animations/landing-variannts';

export const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
