import styles from './ScheduleTable.module.css';
import { Booking, Training } from '../../../../types/Types';
import { getTimeFromDate } from '../../../../utils/dateHelpers';
import { useNavigate } from 'react-router';
import { ScheduleCard } from '../schedule-card/ScheduleCard';
import Button from '../../../../shared/ui/button/Button';
import { useProfile } from '../../../auth/hooks/useProfile';
import { useAppContext } from '../../../../context/AppContext';
interface Props {
  trainings: Training[] | null;
}

const ScheduleTable = ({ trainings }: Props) => {
  const { data: user } = useProfile();
  const navigate = useNavigate();

  const { isMobile } = useAppContext();
  const handleBookingBtn = (id: string) => {
    navigate(`/detailed/training/${id}`);
  };
  const now = new Date();
  // if (isPending) return <Loader />;
  return (
    <>
      {isMobile ? (
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
                        (booking: Booking) =>
                          booking.training &&
                          booking.status === 'booked' &&
                          booking.training._id.toString() ===
                            training._id.toString(),
                      ) ? (
                      <p className={styles.disabledText}>Already booked</p>
                    ) : (
                      <Button
                        className={styles.bookBtn}
                        onClick={() => {
                          handleBookingBtn(training._id);
                        }}
                      >
                        Book
                      </Button>
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
