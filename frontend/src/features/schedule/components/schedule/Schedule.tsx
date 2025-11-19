import { CSSProperties, useEffect, useState } from 'react';
import styles from './Schedule.module.css';
import { Element } from 'react-scroll';
import ScheduleTable from '../schedule-table/ScheduleTable';
import { Training } from '../../../../types/Types';
import { getAllTrainingForDay } from '../../../../services/scheduleService';
import { getNext7Days } from '../../../../utils/dateHelpers';
import { useAppContext } from '../../../../context/AppContext';
import { BounceLoader } from 'react-spinners';
import { useFetchDataWithParam } from '../../../../hooks/useFetchDataWithParam';

const Schedule = () => {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);
  const {
    data: trainings,
    loading,
    error,
  } = useFetchDataWithParam<Training, Date>({
    fetchFunction: getAllTrainingForDay,
    param: day,
  });
  const { color } = useAppContext();

  const override: CSSProperties = {
    margin: '3rem',
  };

  console.log(trainings);
  return (
    <Element name='schedule'>
      <section id='schedule' className={styles.schedule}>
        <div className='container'>
          <h2>Schedule</h2>

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
                    onClick={() => setDay(date)}
                  >
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
            </div>{' '}
            {loading ? (
              <BounceLoader color={color} cssOverride={override} />
            ) : error ? (
              <p className={styles.err}>Error loading schedule</p>
            ) : Array.isArray(trainings) && trainings.length > 0 ? (
              <ScheduleTable trainings={trainings} />
            ) : (
              <p className={styles.err}>
                Schedule for this day is not available, try later!
              </p>
            )}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Schedule;
