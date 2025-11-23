import { useState } from 'react';

import styles from './PricingCard.module.css';

import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Plan } from '../../../../types/Types';
import Button from '../../../../shared/ui/button/Button';

interface Props {
  type: string;
  plans: Plan[];
}
export const PricingCard = ({ plans, type }: Props) => {
  const [selectedOption, setSelectedOption] = useState<Plan>(plans[0]);
  const navigate = useNavigate();

  const handleBookingBtn = (plan: Plan) => {
    if (plan.title.toLowerCase().includes('1 session')) {
      scroller.scrollTo('schedule', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    } else {
      navigate(`/detailed/plan/${plan._id}`);
    }
  };
  const handleOptionChange = (selectedOption: Plan) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className={styles.card}>
      <h3>{type}</h3>
      <div className={styles.categories}>
        {plans.map((plan: Plan, index) => (
          <p
            key={index}
            className={selectedOption.title === plan.title ? styles.active : ''}
            onClick={() => handleOptionChange(plan)}
          >
            {plan.title}
          </p>
        ))}
      </div>
      <div>{selectedOption.description}</div>
      <div>Price: {selectedOption.price}</div>
      <div>
        {' '}
        <Button
          className={styles.btn}
          onClick={() => handleBookingBtn(selectedOption)}
        >
          Buy now
        </Button>
      </div>
    </div>
  );
};
