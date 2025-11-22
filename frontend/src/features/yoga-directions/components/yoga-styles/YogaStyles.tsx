import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Element } from 'react-scroll';
import styles from './YogaStyles.module.css';
import { useFetchData } from '../../../../hooks/useFetchData';
import { YogaStyle } from '../../../../types/Types';
import { getAllStyles } from '../../../../services/stylesService';
import { Slider } from '../../../../shared/slider/Slider';
import { SliderCard } from '../../../../shared/slider-card/SliderCard';
import { YogaFullCard } from '../yoga-full-card/YogaFullCard';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const YogaStyles = () => {
  const { width } = useWindowSize();
  const isMobile = width < 901;
  const { data: yogaStyles } = useFetchData<YogaStyle>({
    fetchFunction: getAllStyles,
  });
  // const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Element name='yogastyles'>
      <section className={styles.yogastyles}>
        <div className='container'>
          <h2>Yoga styles</h2>

          <div className={styles.content}>
            {!isMobile && <YogaFullCard currentStyle={yogaStyles[0]} />}

            <div className={styles.slider}>
              {' '}
              <Slider
                items={yogaStyles}
                renderItem={(item) =>
                  isMobile ? (
                    <YogaFullCard currentStyle={item} />
                  ) : (
                    <SliderCard img={item.image} title={item.title} />
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default YogaStyles;
