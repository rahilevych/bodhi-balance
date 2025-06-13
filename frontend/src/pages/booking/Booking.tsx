import { useParams } from 'react-router';
import styles from './Booking.module.css';
import { useEffect, useState } from 'react';
import { Training } from '../../types/Types';
import { getTrainingById } from '../../services/scheduleService';
import Button from '../../components/Button/Button';

const Booking = () => {
  const { id } = useParams();

  const [training, setTraining] = useState<Training | null>(null);
  useEffect(() => {
    const init = async () => {
      try {
        const res = id && (await getTrainingById(id.toString()));
        setTraining(res);
      } catch (error) {}
    };
    init();
  }, []);

  return (
    <div className={styles.booking}>
      <div className='container'>
        {training && (
          <div className={styles.content}>
            <div className={styles['class-info']}>
              <div className={styles.info}>
                <div>
                  <div className={styles['style-img']}>
                    <img src={training.yogaStyle_id.image} alt='' />
                  </div>
                  <h4>{training.yogaStyle_id.title}</h4>
                </div>
                <div>{training.yogaStyle_id.description}</div>
                <p>
                  <strong>Price: </strong>
                  {training.price} $
                </p>
              </div>
              <div className={styles.trainer}>
                <h4>Trainer</h4>
                <div className={styles['trainer-data']}>
                  {' '}
                  <p>{training.trainer_id.fullName}</p>
                  <p> {training.trainer_id.about}</p>
                  <p>
                    {' '}
                    <strong>Experience: </strong>
                    {training.trainer_id.experience} years
                  </p>
                </div>
              </div>
              <div className={styles.cancellation}>
                <h4>Cancelletion policy</h4>
                <div>
                  You can cancel your booking in your personal account no later
                  than 24 hours before the class.
                </div>
              </div>
            </div>
            <div className={styles['booking-block']}>
              <div className={styles['booking-date']}>
                <div>Date</div>
                <div>{training.datetime.toString()}</div>
              </div>
              <div className={styles['booking-time']}>
                <div>Time</div>
                <div>{training.duration}</div>
              </div>
              <div className={styles.btn}>
                {' '}
                <Button text='Booking' />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
