import { useState } from 'react';
import styles from './Schedule.module.css';
import { Element } from 'react-scroll';
import ScheduleTable from '../schedule-table/ScheduleTable';
import { getNext7Days } from '../../../../utils/dateHelpers';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { container } from '../../../../animations/landing-variannts';
import { useGetTrainingsDay } from '../../hooks/useGetTrainingDay';

const Schedule = () => {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);
  const { data: trainings, isPending } = useGetTrainingsDay(day);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  if (isPending) return <p>loading</p>;
  return (
    <Element name='schedule'>
      <section id='schedule' className={styles.schedule} ref={ref}>
        <motion.div
          className='container'
          variants={container}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
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
            <ScheduleTable trainings={trainings} />
          </div>
        </motion.div>
      </section>
    </Element>
  );
};

export default Schedule;
