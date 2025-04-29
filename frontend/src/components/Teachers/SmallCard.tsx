import { Teacher } from '../../types/Types';
import styles from './SmallCard.module.css';
interface Props {
  trainer: Teacher;
}

export const SmallCard = ({ trainer }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img src={trainer.photo} alt='' />
      </div>
      <p>{trainer.fullName}</p>
    </div>
  );
};
