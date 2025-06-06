import { useEffect, useState } from 'react';
import styles from './Schedule.module.css';
import { Element } from 'react-scroll';
import ScheduleTable from './ScheduleTable';
import { Training } from '../../types/Types';
import { getAllTrainingForDay } from '../../services/scheduleService';
import { getNext7Days } from '../../utils/dateHelpers';
import { useAppContext } from '../../context/AppContext';
import { BounceLoader } from 'react-spinners';

const Schedule = () => {
  const today = new Date();
  const [trainings, setTrainings] = useState<Training[] | null>(null);
  const [day, setDay] = useState<Date>(today);
  const { loading, color } = useAppContext();

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getAllTrainingForDay(day);
        console.log(data);
        setTrainings(data);
      } catch (error) {
        console.error('Error loading schedule', error);
      }
    };
    init();
  }, [day]);

  return (
    <Element name='schedule'>
      <section id='schedule' className={styles.schedule}>
        <div className='container'>
          <h2>Schedule</h2>
          {trainings && trainings?.length > 0 ? (
            <div className={styles.timetable}>
              <div className={styles.days}>
                <ul>
                  {getNext7Days().map((date, index) => (
                    <li
                      className={
                        date.toDateString() === day.toDateString()
                          ? styles.active
                          : ''
                      }
                      key={index}
                      onClick={() => setDay(date)}>
                      <p className={styles.weekday}>
                        {date.toLocaleDateString('en-US', { weekday: 'long' })}
                      </p>
                      <p className={styles.dayMonth}>
                        {date.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'numeric',
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              {<ScheduleTable trainings={trainings} />}
            </div>
          ) : (
            <BounceLoader />
          )}
        </div>
      </section>
    </Element>
  );
};

export default Schedule;
