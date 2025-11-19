import styles from './ScheduleTable.module.css';
import Button from '../../../../shared/button/Button';
import { ScheduleCard } from '../../../../components/Schedule/ScheduleCard';
import { Training } from '../../../../types/Types';
import { getTimeFromDate } from '../../../../utils/dateHelpers';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../../../context/AppContext';
import { useEffect, useState } from 'react';

interface Props {
  trainings: Training[] | null;
}

const ScheduleTable = ({ trainings }: Props) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [showCard, setShowCard] = useState(false);
  const handleBookingBtn = (id: string) => {
    navigate(`/detailed/training/${id}`);
  };
  const now = new Date();
  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      setShowCard(width <= 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  return (
    <>
      {showCard ? (
        <div className={styles.cardsWrapper}>
          {trainings?.map((item, index) => (
            <ScheduleCard
              key={index}
              item={item}
              onClick={() => handleBookingBtn(item._id)}
            />
          ))}
        </div>
      ) : (
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
                    {new Date(training.datetime) < now ||
                    training.spots_taken === training.spots_total ? (
                      <p>Booking closed</p>
                    ) : user?.bookings.some(
                        (booking) =>
                          booking.training &&
                          booking.status === 'booked' &&
                          booking.training._id.toString() ===
                            training._id.toString(),
                      ) ? (
                      <p className={styles.disabledText}>Already booked</p>
                    ) : (
                      <Button
                        text='Book '
                        className={styles.bookBtn}
                        onClick={() => {
                          handleBookingBtn(training._id);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ScheduleTable;
