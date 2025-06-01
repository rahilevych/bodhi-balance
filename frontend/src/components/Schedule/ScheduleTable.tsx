import styles from './ScheduleTable.module.css';
import Button from '../button/Button';
import { ScheduleCard } from './ScheduleCard';
import { Training } from '../../types/Types';
import { getTimeFromDate } from '../../utils/dateHelpers';

interface Props {
  trainings: Training[] | null;
}

const ScheduleTable = ({ trainings }: Props) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Spots</th>
            <th>Duration</th>
            <th>Trainer</th>
            <th>Book a class</th>
          </tr>
        </thead>
        <tbody>
          {trainings?.map((training, index) => (
            <tr key={index}>
              <td>{getTimeFromDate(training.datetime)}</td>
              <td>{training.yogaStyle_id.title}</td>

              <td>
                {training.spots_taken}/{training.spots_total}
              </td>
              <td>{training.yogaStyle_id.duration}</td>
              <td>{training.trainer_id.fullName}</td>
              <td>
                <Button text='Book ' className={styles.bookBtn}></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {trainings?.map((item, index) => (
        <ScheduleCard key={index} item={item} />
      ))}
    </div>
  );
};

export default ScheduleTable;
