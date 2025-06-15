import styles from './ScheduleTable.module.css';
import Button from '../Button/Button';
import { ScheduleCard } from './ScheduleCard';
import { Training, YogaStyle } from '../../types/Types';
import { getTimeFromDate } from '../../utils/dateHelpers';
import { useNavigate } from 'react-router';

interface Props {
  trainings: Training[] | null;
}

const ScheduleTable = ({ trainings }: Props) => {
  const navigate = useNavigate();

  const handleBookingBtn = (id: string) => {
    navigate(`/booking/${id}`);
  };
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
                <Button
                  text='Book '
                  className={styles.bookBtn}
                  onClick={() => {
                    console.log(training._id);
                    handleBookingBtn(training._id);
                  }}></Button>
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
