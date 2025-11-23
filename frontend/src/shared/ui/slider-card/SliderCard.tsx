import React from 'react';
import styles from './SliderCard.module.css';
interface SliderCardProps {
  img: string;
  title: string;
}
export const SliderCard = ({ img, title }: SliderCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img src={img} alt='slider image' />
      </div>
      <p>{title}</p>
    </div>
  );
};
