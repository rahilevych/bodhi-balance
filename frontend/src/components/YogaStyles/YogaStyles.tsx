import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Element } from 'react-scroll';
import YogaCard from '../yogaCard/YogaCard';
import styles from './YogaStyles.module.css';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import SliderNav from '../sliderNav/SliderNav';
import { YogaStyle } from '../../types/Types';
import { getAllStyles } from '../../services/stylesService';

const YogaStyles = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [yogaStyles, setYogaStyles] = useState<YogaStyle[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSlideChange = (index: number) => {
    swiperRef.current?.slideToLoop(index);
    swiperRef.current?.pagination?.update();
  };

  useEffect(() => {
    const init = async () => {
      try {
        const styles = await getAllStyles();
        console.log(styles);
        setYogaStyles(styles);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, [yogaStyles.length]);

  return (
    <Element name='yogastyles'>
      <section className={styles.yogastyles}>
        <div className='container'>
          <h2>Yoga styles</h2>
          <div className={styles.content}>
            <ul className={styles.types}>
              {yogaStyles != null &&
                yogaStyles.map((style, index) => (
                  <li
                    className={index === activeIndex ? styles.active : ''}
                    key={index}
                    onClick={() => handleSlideChange(index)}>
                    {style.title}
                  </li>
                ))}
            </ul>{' '}
            <div className={styles.slider}>
              <Swiper
                modules={[Pagination]}
                pagination={{
                  el: '#custom-swiper-progressbar',
                  progressbarFillClass: 'swiper-pagination-progressbar-fill',
                  type: 'progressbar',
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={yogaStyles.length > 1}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 1 },
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}>
                {' '}
                {yogaStyles.map((style) => (
                  <SwiperSlide key={style.id}>
                    <YogaCard card={style} />
                  </SwiperSlide>
                ))}{' '}
                <SliderNav />
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default YogaStyles;
