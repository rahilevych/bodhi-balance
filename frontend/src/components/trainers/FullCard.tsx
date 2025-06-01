import { Trainer } from '../../types/Types';
import styles from './FullCard.module.css';
interface Props {
  currentTeacher: Trainer;
}

export const FullCard = ({ currentTeacher }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img src={currentTeacher.photo} alt='' />
      </div>
      <div className={styles.info}>
        <h4>{currentTeacher.fullName}</h4>
        <p>{currentTeacher.experience}</p>
        <p>{currentTeacher.specialization}</p>
        <p>{currentTeacher.about}</p>
      </div>
    </div>
  );
};
