import { Element, Link } from 'react-scroll';
import Button from '../button/Button';
import styles from './Home.module.css';

const Home = () => {
  return (
    <Element name='home'>
      <section className={styles.home}>
        <h1 className={styles.h1}>
          <span>Bodhi</span>
          <span>Balance</span>
        </h1>
        <div className={styles.content}>
          <div>
            <img
              src='https://i.pinimg.com/474x/02/eb/d3/02ebd393bab869a0c904cd22a35a168d.jpg'
              alt=''
            />
          </div>

          <div>
            <img
              src='https://i.pinimg.com/474x/d8/7e/c1/d87ec1ef41fd07f328aa46cb1b582aee.jpg'
              alt=''
            />
          </div>
          <div>
            <p>Find your inner balance and strength through mindful movement</p>

            <Link to='schedule' smooth={true}>
              <Button text='Check classes' />
            </Link>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Home;
