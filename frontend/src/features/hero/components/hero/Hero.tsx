import { Element, Link } from 'react-scroll';
import Button from '../../../../shared/button/Button';
import styles from './Hero.module.css';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const Hero = () => {
  const { width } = useWindowSize();
  const isMobile = width < 769;

  return (
    <Element name='home'>
      <section className={styles.home}>
        <div className={` ${styles.container}`}>
          <h1 className={styles.h1}>
            <span>Bodhi</span>
            <span>Balance</span>
          </h1>

          {isMobile ? (
            <div className={styles.img}>
              <img
                src='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
              />
            </div>
          ) : (
            ''
          )}
          <div className={styles.button}>
            <Link to='schedule' smooth={true}>
              <Button>Check classes</Button>
            </Link>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Hero;
