import { Element, Link } from 'react-scroll';
import Button from '../../../../shared/button/Button';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Element name='home'>
      <section className={styles.home}>
        <div className={` ${styles.container}`}>
          {/* <h1 className={styles.h1}>
            <span>Bodhi</span>
            <span>Balance</span>
          </h1>
          <div className={styles.button}>
            <Link to='schedule' smooth={true}>
              <Button>Check classes</Button>
            </Link>
          </div> */}
        </div>
      </section>
    </Element>
  );
};

export default Hero;
