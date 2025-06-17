import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useFetchDataWithParam } from '../../hooks/useFetchDataWithParam';
import { getTrainingById } from '../../services/scheduleService';
import { Training } from '../../types/Types';

import styles from './TrainingDetailed.module.css';
import {
  convertDateToString,
  getEndTime,
  getTimeFromDate,
} from '../../utils/dateHelpers';
import Button from '../Button/Button';
import { useCheckout } from '../../hooks/useCheckout';

interface TrainingDetailedProps {
  id: string;
}
export const TrainingDetailed = ({ id }: TrainingDetailedProps) => {
  const { startCheckout } = useCheckout();
  const {
    data: training,
    loading,
    error,
  } = useFetchDataWithParam<Training, string>({
    fetchFunction: getTrainingById,
    param: id?.toString(),
  });

  if (!training || Array.isArray(training)) return null;
  return (
    <div className={styles.content}>
      <div className={styles.training}>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={training?.yogaStyle_id.image} alt='' />
          </div>
          <div>
            <h4>{training?.yogaStyle_id.title}</h4>
            <div className={styles.description}>
              {training?.yogaStyle_id.description}
            </div>

            <div className={styles.date}>
              <p>Date</p>
              <div>
                {' '}
                <FaCalendarAlt className={styles.icon} />
                {convertDateToString(training.datetime)}
              </div>
            </div>
            <div className={styles.time}>
              <p>Time</p>
              <div>
                <FaClock className={styles.icon} />
                {getTimeFromDate(training.datetime) +
                  '- ' +
                  getEndTime(training.datetime, training.duration)}
              </div>
            </div>

            <div className={styles.btn}>
              <div className={styles.price}>
                {' '}
                <p>Price:</p>
                {training?.price} $
              </div>
              <Button text='Book' onClick={() => startCheckout(training._id)} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.trainer}>
        <div className={styles.img}>
          <img src={training?.trainer_id.photo} alt='' />
        </div>
        <div>
          <h4>{training?.trainer_id.fullName}</h4>
          <div className={styles['trainer-data']}>
            <p> {training?.trainer_id.about}</p>
            <p>
              <label>Experience: </label>
              {training?.trainer_id.experience} years
            </p>
            <p>
              <label>Specialization: </label>
              {training?.trainer_id.specialization}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cancellation}>
        <h4>Cancellation policy</h4>
        <div>
          You can cancel your booking in your personal account no later than 24
          hours before the class.
        </div>
      </div>
    </div>
  );
};
