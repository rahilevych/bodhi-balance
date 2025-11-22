import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Atmosphere.module.css';
import { Pagination } from 'swiper/modules';
import { Element } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { container } from '../../../../animations/landing-variannts';
const images = [
  'https://i.pinimg.com/736x/63/9a/55/639a5571c1081ef65155096efc4bf372.jpg',
  'https://i.pinimg.com/736x/91/5b/0c/915b0cf814f5d6b0608ce5cb1140d72a.jpg',
  'https://i.pinimg.com/736x/58/3f/b0/583fb01fcfd3208b2ff3a22828caa142.jpg',
];
const Atmosphere = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <Element name='atmosphere'>
      <section id='atmosphere' className={styles.atmosphere} ref={ref}>
        <motion.div
          className='container'
          variants={container}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2>Atmosphere</h2>
          <div className={styles.photos}>
            {' '}
            <div className={styles['left-part']}>
              <div>
                <img
                  src='https://i.pinimg.com/736x/63/9a/55/639a5571c1081ef65155096efc4bf372.jpg'
                  alt=''
                />
              </div>
              <div>
                <img
                  src='https://i.pinimg.com/736x/91/5b/0c/915b0cf814f5d6b0608ce5cb1140d72a.jpg'
                  alt=''
                />
                <img
                  src='https://i.pinimg.com/736x/58/3f/b0/583fb01fcfd3208b2ff3a22828caa142.jpg'
                  alt=''
                />
              </div>
            </div>
            <div className={styles['right-part']}>
              <div>
                <img
                  src='https://i.pinimg.com/736x/86/b0/6b/86b06b4f855aee9ffd0444222d718e75.jpg'
                  alt=''
                />
                <img
                  src='https://i.pinimg.com/736x/8a/db/2d/8adb2d216841e66a00b04c1294f9e371.jpg'
                  alt=''
                />
              </div>
              <div>
                <img
                  src='https://i.pinimg.com/736x/e4/31/61/e431613d06d516332178e92795677446.jpg'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className={styles.slider}>
            <Swiper
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={30}
              style={{ height: '28rem' }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.image}>
                    <img src={image} alt='' />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </section>
    </Element>
  );
};

export default Atmosphere;
