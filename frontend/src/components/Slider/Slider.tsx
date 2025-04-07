import React, { useEffect, useState } from 'react';

import styles from './Slider.module.css';

import SliderNav from '../SliderNavigation/SliderNav';

interface Props<T> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
}
const Slider = <T,>({ items, renderCard }: Props<T>) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNextBtn = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };
  const handlePrevBtn = () => {
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextBtn();
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);
  return (
    <div className={styles.slider}>
      {renderCard(items[index])}
      <div className={styles.nav}>
        {' '}
        <SliderNav
          nextBtn={handleNextBtn}
          prevBtn={handlePrevBtn}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default Slider;
