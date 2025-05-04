import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';
import { SmallCard } from './SmallCard';
import styles from './Teachers.module.css';
import { trainerData } from '../../data/teachers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FullCard } from './FullCard';
import SliderNav from '../SliderNavigation/SliderNav';

const Teachers = () => {
  const [currentTeacher, setCurrentTeacher] = useState(trainerData[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.trainers} id='teachers'>
      <div className='container'>
        <h2>Trainers</h2>
        <div className={styles.info}>
          <div className={styles.selectedTrainer}>
            {' '}
            {!isMobile && <FullCard currentTeacher={currentTeacher} />}
          </div>

          <div className={styles.slider}>
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{
                el: '#custom-swiper-progressbar',
                progressbarFillClass: 'swiper-pagination-progressbar-fill',
                type: 'progressbar',
              }}
              loop={true}
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 1 },
                900: { slidesPerView: 2 },
                1440: { slidesPerView: 3 },
              }}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex;
                setCurrentTeacher(trainerData[realIndex]);
              }}>
              {' '}
              {trainerData.map((trainer) => (
                <SwiperSlide key={trainer.id}>
                  <div
                    onClick={() => setCurrentTeacher(trainer)}
                    className={`${styles.sliderCard} ${
                      currentTeacher.id === trainer.id
                        ? styles.selected
                        : styles.notSelected
                    }`}>
                    {isMobile ? (
                      <FullCard currentTeacher={trainer} />
                    ) : (
                      <SmallCard trainer={trainer} />
                    )}
                  </div>
                </SwiperSlide>
              ))}
              <SliderNav />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teachers;
