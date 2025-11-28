import 'swiper/swiper-bundle.css';
import { useState } from 'react';
import styles from './Trainers.module.css';
import { FullCard } from '../full-card/FullCard';
import { Element } from 'react-scroll';
import { Trainer } from '../../../../types/Types';
import { SliderCard } from '../../../../shared/ui/slider-card/SliderCard';
import { container } from '../../../../animations/landing-variannts';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Slider } from '../../../../shared/ui/slider/Slider';
import { useGetTrainers } from '../../hooks/useGetTrainers';
import { useAppContext } from '../../../../context/AppContext';
import { YogaStylesSkeleton } from '../../../yoga-directions/components/yoga-styles/YogaStylesSkeleton';

const Trainers = () => {
  const { data: trainers, isPending } = useGetTrainers();
  const [currentTrainer, setCurrentTrainer] = useState(0);

  const { isMobile } = useAppContext();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  if (isPending) return <YogaStylesSkeleton />;

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
              {!isMobile && (
                <FullCard currentTrainer={trainers[currentTrainer]} />
              )}
            </div>
            <div className={styles.slider}>
              {' '}
              {
                <Slider
                  onSlideChange={setCurrentTrainer}
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
