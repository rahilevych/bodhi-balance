import 'swiper/swiper-bundle.css';
import { useState } from 'react';
import styles from './Trainers.module.css';
import { FullCard } from '../full-card/FullCard';
import { Element } from 'react-scroll';
import { Trainer } from '../../../../types/Types';

import { SliderCard } from '../../../../shared/ui/slider-card/SliderCard';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { container } from '../../../../animations/landing-variannts';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Slider } from '../../../../shared/ui/slider/Slider';
import { useGetTrainers } from '../../hooks/useGetTrainers';
const Trainers = () => {
  const { data: trainers, isPending } = useGetTrainers();
  const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>();
  const { width } = useWindowSize();
  const isMobile = width < 901;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  if (isPending) return <p>loading</p>;

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
              {
                <Slider
                  items={trainers}
                  renderItem={(item: Trainer) =>
                    isMobile ? (
                      <FullCard currentTrainer={item} />
                    ) : (
                      <SliderCard img={item.photo} title={item.fullName} />
                    )
                  }
                />
              }
            </div>
          </div>
        </motion.div>
      </section>
    </Element>
  );
};

export default Trainers;
