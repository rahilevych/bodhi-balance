import React from 'react';
import styles from './SliderNav.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProgressBar from '../progress-bar/ProgressBar';
interface Props {
  nextBtn: () => void;
  prevBtn: () => void;
  progress: number;
}
const SliderNav: React.FC<Props> = ({ nextBtn, prevBtn, progress }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.buttons}>
        <button className={styles.arrow} onClick={prevBtn}>
          <FiChevronLeft className={styles.icon} />
        </button>
        <button className={styles.arrow} onClick={nextBtn}>
          {' '}
          <FiChevronRight className={styles.icon} />
        </button>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default SliderNav;
