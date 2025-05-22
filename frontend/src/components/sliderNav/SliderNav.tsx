import styles from './SliderNav.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSwiper } from 'swiper/react';

const SliderNav = () => {
  const swiper = useSwiper();

  return (
    <div className={styles.navigation}>
      <div className={styles.buttons}>
        <button
          className={styles.arrow}
          onClick={() => swiper && swiper.slidePrev()}>
          <FiChevronLeft className={styles.icon} />
        </button>
        <button
          className={styles.arrow}
          onClick={() => swiper && swiper.slideNext()}>
          {' '}
          <FiChevronRight className={styles.icon} />
        </button>
      </div>
      <div className={styles.pagination} id='custom-swiper-progressbar' />
    </div>
  );
};

export default SliderNav;
