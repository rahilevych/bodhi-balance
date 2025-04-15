import { FaEdit } from 'react-icons/fa';
import { scheduleData } from '../../data/schedule';
import styles from './ScheduleTable.module.css';
import { ScheduleCard } from './ScheduleCard';

interface Props {
  day: string;
}

const ScheduleTable = ({ day }: Props) => {
  const data = scheduleData[day];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Format</th>
            <th>Spots</th>
            <th>Duration</th>
            <th>Trainer</th>
            <th>Book a class</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{item.type}</td>
              <td>{item.format}</td>
              <td>{item.spots}</td>
              <td>{item.duration}</td>
              <td>{item.trainer}</td>
              <td>
                <button className={styles.bookBtn}>
                  Book <FaEdit className={styles.icon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.map((item, index) => (
        <ScheduleCard key={index} item={item} />
      ))}
    </div>
  );
};

export default ScheduleTable;
