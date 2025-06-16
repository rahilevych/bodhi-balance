import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';
import { SmallCard } from './SmallCard';
import styles from './Trainers.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FullCard } from './FullCard';
import SliderNav from '../sliderNav/SliderNav';
import { Element } from 'react-scroll';
import { Trainer } from '../../types/Types';
import { getAllTrainers } from '../../services/trainerService';
import { BounceLoader } from 'react-spinners';
import { useAppContext } from '../../context/AppContext';
import { useFetchData } from '../../hooks/useFetchData';

const Trainers = () => {
  const {
    data: trainers,
    loading,
    error,
  } = useFetchData<Trainer>({ fetchFunction: getAllTrainers });
  const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>();
  const [isMobile, setIsMobile] = useState(false);
  const { color } = useAppContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (trainers && trainers.length > 0 && !currentTrainer) {
      setCurrentTrainer(trainers[0]);
    }
  }, [trainers]);

  if (error) {
    return <div>Somethig went wrong!</div>;
  }

  return (
    <Element name={'trainers'}>
      <section className={styles.trainers}>
        <div className='container'>
          <h2>Trainers</h2>
          {trainers.length > 0 ? (
            <div className={styles.info}>
              <div className={styles.selectedTrainer}>
                {' '}
                {!isMobile && currentTrainer && (
                  <FullCard currentTrainer={currentTrainer} />
                )}
              </div>

              {trainers && currentTrainer && (
                <div className={styles.slider}>
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{
                      el: '#custom-swiper-progressbar',
                      progressbarFillClass:
                        'swiper-pagination-progressbar-fill',
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
                      setCurrentTrainer(trainers[realIndex]);
                    }}>
                    {' '}
                    {trainers.map((trainer, index) => (
                      <SwiperSlide key={index}>
                        <div
                          onClick={() => setCurrentTrainer(trainer)}
                          className={`${styles.sliderCard} ${
                            currentTrainer?._id === trainer._id
                              ? styles.selected
                              : styles.notSelected
                          }`}>
                          {isMobile ? (
                            <FullCard currentTrainer={trainer} />
                          ) : (
                            <SmallCard trainer={trainer} />
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                    <SliderNav />
                  </Swiper>
                </div>
              )}
            </div>
          ) : (
            <BounceLoader loading={loading} color={color} />
          )}
        </div>
      </section>
    </Element>
  );
};

export default Trainers;
