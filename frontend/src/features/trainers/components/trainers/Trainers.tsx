import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';
import styles from './Trainers.module.css';
import { FullCard } from '../full-card/FullCard';
import { Element } from 'react-scroll';
import { Trainer } from '../../../../types/Types';
import { getAllTrainers } from '../../../../services/trainerService';
import { useFetchData } from '../../../../hooks/useFetchData';
import { Slider } from '../../../../shared/slider/Slider';
import { SliderCard } from '../../../../shared/slider-card/SliderCard';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { container } from '../../../../animations/landing-variannts';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
const Trainers = () => {
  const { data: trainers } = useFetchData<Trainer>({
    fetchFunction: getAllTrainers,
  });
  const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>();
  const { width } = useWindowSize();
  const isMobile = width < 901;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  useEffect(() => {
    if (trainers && trainers.length > 0 && !currentTrainer) {
      setCurrentTrainer(trainers[0]);
    }
  }, [trainers]);

  return (
    <Element name={'trainers'}>
      <section className={styles.trainers} ref={ref}>
        <motion.div
          className='container'
          variants={container}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2>Trainers</h2>
          <div className={styles.info}>
            <div className={styles.selectedTrainer}>
              {' '}
              {!isMobile && currentTrainer && (
                <FullCard currentTrainer={currentTrainer} />
              )}
            </div>
            <div className={styles.slider}>
              {' '}
              <Slider
                items={trainers}
                renderItem={(item) =>
                  isMobile ? (
                    <FullCard currentTrainer={item} />
                  ) : (
                    <SliderCard img={item.photo} title={item.fullName} />
                  )
                }
              />
            </div>
          </div>
        </motion.div>
      </section>
    </Element>
  );
};

export default Trainers;
