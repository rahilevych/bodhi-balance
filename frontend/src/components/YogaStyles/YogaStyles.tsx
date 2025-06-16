import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Element } from 'react-scroll';
import YogaCard from '../YogaCard/YogaCard';
import styles from './YogaStyles.module.css';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import SliderNav from '../sliderNav/SliderNav';
import { YogaStyle } from '../../types/Types';
import { getAllStyles } from '../../services/stylesService';
import { BounceLoader } from 'react-spinners';
import { useAppContext } from '../../context/AppContext';
import { useFetchData } from '../../hooks/useFetchData';

const YogaStyles = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const {
    data: yogaStyles,
    loading,
    error,
  } = useFetchData<YogaStyle>({
    fetchFunction: getAllStyles,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const { color } = useAppContext();

  const handleSlideChange = (index: number) => {
    swiperRef.current?.slideToLoop(index);
    swiperRef.current?.pagination?.update();
  };

  if (error) {
    return <div>Somethig went wrong!</div>;
  }
  return (
    <Element name='yogastyles'>
      <section className={styles.yogastyles}>
        <div className='container'>
          <h2>Yoga styles</h2>
          {yogaStyles.length > 0 ? (
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
                  {yogaStyles.map((style, index) => (
                    <SwiperSlide key={index}>
                      <YogaCard card={style} />
                    </SwiperSlide>
                  ))}
                  <SliderNav />
                </Swiper>
              </div>
            </div>
          ) : (
            <BounceLoader loading={loading} color={color} />
          )}
        </div>
      </section>
    </Element>
  );
};

export default YogaStyles;
