import { YogaStyle } from '../../../../types/Types';
import styles from './YogaFullCard.module.css';
interface YogaFullCardProps {
  currentStyle: YogaStyle;
}

export const YogaFullCard = ({ currentStyle }: YogaFullCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img src={currentStyle?.image} alt='' />
      </div>
      <div className={styles.info}>
        <h4>{currentStyle?.title}</h4>
        <p>
          <strong> Duration: </strong>
          {currentStyle?.duration}
        </p>
        <p>
          <strong>Trainer:</strong> {currentStyle?.trainer}
        </p>
        <p>
          <strong>About:</strong> {currentStyle?.description}
        </p>
      </div>
    </div>
  );
};
