import React, { useRef, useState } from 'react';
import styles from './Slider.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
interface SliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}
export const Slider = <T,>({ items, renderItem }: SliderProps<T>) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isBeginn, setIsBeginn] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className={styles.wrapper}>
      <button
        ref={prevRef}
        className={`${styles.prev} ${isBeginn ? styles.hidden : ''}`}
      >
        <FaChevronLeft />
      </button>
      <button
        ref={nextRef}
        className={`${styles.next} ${isEnd ? styles.hidden : ''}`}
      >
        <FaChevronRight />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSlideChange={(swiper) => {
          setIsBeginn(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          900: { slidesPerView: 2, pagination: { clickable: true } },
          1200: { slidesPerView: 2, pagination: false },
          1440: { slidesPerView: 2.5, pagination: false },
        }}
        centeredSlides={false}
        grabCursor={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div> {renderItem(item, index)}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
