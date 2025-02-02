import React from 'react';
import { YogaCardType } from '../../types/Types';
import styles from './YogaCard.module.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
interface Props {
  card: YogaCardType;
}

const YogaCard: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={card.image} alt='' />
      </div>
      <div className={styles.info}>
        <h3>{card.title}</h3>
        <p>
          {' '}
          <FaCalendarAlt className={styles.icon} />
          Days: {card.days.join(', ')}
        </p>
        <p>
          <FaClock className={styles.icon} />
          Duration: {card.duration}
        </p>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default YogaCard;
