import { Trainer } from '../../../../types/Types';
import styles from './FullCard.module.css';
interface Props {
  currentTrainer: Trainer;
}

export const FullCard = ({ currentTrainer: currentTrainer }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img src={currentTrainer?.photo} alt='' />
      </div>
      <div className={styles.info}>
        <h4>{currentTrainer?.fullName}</h4>
        <p>
          <strong> Experience: </strong>
          {currentTrainer?.experience} years
        </p>
        <p>
          <strong>Specialization:</strong> {currentTrainer?.specialization}
        </p>
        <p>
          <strong>About:</strong> {currentTrainer?.about}
        </p>
      </div>
    </div>
  );
};
