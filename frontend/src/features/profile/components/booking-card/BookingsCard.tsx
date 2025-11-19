import { useState } from 'react';
import { cancelBooking } from '../../../../services/bookingsService';
import { Booking } from '../../../../types/Types';
import { convertDateToString } from '../../../../utils/dateHelpers';
import Button from '../../../../shared/button/Button';
import { ConfirmationWindow } from '../../../../styles/modal/ConfirmationWindow';
import styles from './BookingsCard.module.css';
interface BookingsCardProps {
  booking: Booking;
  handleCancel: (bookingId: string, trainingId: string) => void;
}

export const BookingsCard = ({ booking, handleCancel }: BookingsCardProps) => {
  const now = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.card}>
      <p>
        <label>Training:</label> {booking.training.yogaStyle_id.title}
      </p>
      <p>
        <label>Booking date:</label> {convertDateToString(booking.date)}
      </p>
      <p>
        <label>Training date:</label>{' '}
        {convertDateToString(booking.training.datetime)}
      </p>
      <p>
        <label>Status:</label> {booking.status}
      </p>
      <div>
        {booking.status === 'booked' &&
        new Date(booking.training.datetime).getTime() - now.getTime() >
          24 * 60 * 60 * 1000 ? (
          <>
            {' '}
            <Button text='Cancel' onClick={() => setIsModalOpen(true)}>
              Cancel
            </Button>{' '}
            <ConfirmationWindow
              isOpen={isModalOpen}
              message='Are you sure you want to cancel?'
              onConfirm={() => {
                setIsModalOpen(false);
                handleCancel(booking._id, booking.training._id);
              }}
              onCancel={() => setIsModalOpen(false)}
            />{' '}
          </>
        ) : (
          <p>Cancellation isn't availiable</p>
        )}
      </div>
    </div>
  );
};
