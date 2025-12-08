import { Trainer } from '../../../../types/Types';
import styles from './SmallCard.module.css';
interface Props {
  trainer: Trainer;
}

export const SmallCard = ({ trainer }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img src={trainer.photo} alt='trainer-img' />
      </div>
      <p>{trainer.fullName}</p>
    </div>
  );
};
