import { useState } from 'react';
import styles from './Schedule.module.css';
import { Element } from 'react-scroll';
import ScheduleTable from '../schedule-table/ScheduleTable';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { container } from '../../../../animations/landing-variannts';
import { useGetTrainingsDay } from '../../hooks/useGetTrainingDay';
import { ScheduleDays } from '../schedule-days/ScheduleDays';
import { ScheduleSkeleton } from './ScheduleSkeleton';

const Schedule = () => {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);
  const { data: trainings, isPending } = useGetTrainingsDay(day);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  if (isPending) return <ScheduleSkeleton />;
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
            <ScheduleDays day={day} setDay={setDay} />
            {trainings.length > 0 ? (
              <ScheduleTable trainings={trainings} />
            ) : (
              <p>Schedule not available</p>
            )}
          </div>
        </motion.div>
      </section>
    </Element>
  );
};

export default Schedule;
