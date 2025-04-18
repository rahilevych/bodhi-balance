import React, { useEffect, useState } from 'react';

import styles from './Slider.module.css';

import SliderNav from '../SliderNavigation/SliderNav';
import { YogaCardType } from '../../types/Types';

interface Props {
  items: YogaCardType[];
  renderCard: (item: YogaCardType) => React.ReactNode;
  currentCard: YogaCardType;
  onChange: (card: YogaCardType) => void;
}
const Slider = ({ items, renderCard, currentCard, onChange }: Props) => {
  const [index, setIndex] = useState(
    items.findIndex((item) => item.id === currentCard.id)
  );
  const [progress, setProgress] = useState(0);

  const handleNextBtn = () => {
    setIndex((prev) => {
      const newIndex = (prev + 1) % items.length;
      onChange(items[newIndex]);
      return newIndex;
    });
  };
  const handlePrevBtn = () => {
    setIndex((prev) => {
      const newIndex = prev === 0 ? items.length - 1 : prev - 1;
      onChange(items[newIndex]);
      return newIndex;
    });
  };
  useEffect(() => {
    const currentIndex = items.findIndex((item) => item.id === currentCard.id);
    setIndex(currentIndex);
  }, [currentCard, items]);
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextBtn();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const calculatedProgress = ((index + 1) / items.length) * 100;
    setProgress(calculatedProgress);
  }, [index, items.length]);
  return (
    <div className={styles.slider}>
      {renderCard(currentCard)}
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
