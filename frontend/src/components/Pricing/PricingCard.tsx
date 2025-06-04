import { useState } from 'react';
import Button from '../Button/Button';
import styles from './PricingCard.module.css';
import { Plan } from '../../types/Types';
interface Props {
  type: string;
  plans: Plan[];
}
export const PricingCard = ({ plans, type }: Props) => {
  const [selectedOption, setSelectedOption] = useState<Plan>(plans[0]);

  const handleOptionChange = (selectedOption: Plan) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className={styles.card}>
      <h3>{type}</h3>
      <div className={styles.categories}>
        {plans.map((plan: Plan, index: any) => (
          <p
            key={index}
            className={selectedOption.title === plan.title ? styles.active : ''}
            onClick={() => handleOptionChange(plan)}>
            {plan.title}
          </p>
        ))}
      </div>
      <div>{selectedOption.description}</div>
      <div>Price: {selectedOption.price}</div>
      <div>
        {' '}
        <Button text='Book now' />
      </div>
    </div>
  );
};
