import { useState } from 'react';
import styles from './Schedule.module.css';
import ScheduleTable from './ScheduleTable';
import { Element } from 'react-scroll';
export const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const Schedule = () => {
  const today = new Date();
  const jsDay = today.getDay();
  const adjustedIndex = jsDay === 0 ? 6 : jsDay - 1;
  const currentDay = daysOfWeek[adjustedIndex];

  const [day, setDay] = useState<string>(currentDay);

  const handleDayChange = (selectedDay: string) => {
    console.log(selectedDay);
    setDay(selectedDay);
  };

  return (
    <Element name='schedule'>
      <section id='schedule' className={styles.schedule}>
        <div className='container'>
          <h2>Schedule</h2>
          <div className={styles.days}>
            <ul>
              {daysOfWeek.map((weekDay, index) => (
                <li
                  className={day === weekDay ? styles.active : ''}
                  key={index}
                  onClick={() => handleDayChange(weekDay)}>
                  {weekDay}
                </li>
              ))}
            </ul>
          </div>
          <ScheduleTable day={day} />
        </div>
      </section>
    </Element>
  );
};

export default Schedule;
