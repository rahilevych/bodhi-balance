import { ScheduleDaysSkeleton } from '../schedule-days/ScheduleDaysSkeleton';
import { ScheduleTableSkeleton } from '../schedule-table/ScheduleTableSkeleton';
import styles from './Schedule.module.css';

export const ScheduleSkeleton = () => {
  return (
    <section id='schedule' className={styles.schedule}>
      <div className='container'>
        <h2>Schedule</h2>
        <div className={styles.timetable}>
          <ScheduleDaysSkeleton />
          <ScheduleTableSkeleton />
        </div>
      </div>
    </section>
  );
};
