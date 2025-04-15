import styles from './ScheduleCard.module.css';
interface Props {
  item: any;
}
export const ScheduleCard = ({ item }: Props) => {
  return (
    <div className={styles.card}>
      <p>
        <strong>Time:</strong> {item.time}
      </p>
      <p>
        <strong>Type:</strong> {item.type}
      </p>
      <p>
        <strong>Format:</strong> {item.format}
      </p>
      <p>
        <strong>Spots:</strong> {item.spots}
      </p>
      <p>
        <strong>Duration:</strong> {item.duration}
      </p>
      <p>
        <strong>Trainer:</strong> {item.trainer}
      </p>
      <button className={styles.bookBtn}>Book a class</button>
    </div>
  );
};
