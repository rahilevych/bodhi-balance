import { useState } from 'react';
import Button from '../button/Button';
import styles from './PricingCard.module.css';
interface Props {
  plan: any;
}
export const PricingCard = ({ plan }: Props) => {
  const [selectedOption, setSelectedOption] = useState(plan.options[0]);

  const handleOptionChange = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className={styles.card}>
      <h3>{plan.category}</h3>
      <div className={styles.categories}>
        {plan.options &&
          plan.options.map((option: any, index: any) => (
            <p
              key={index}
              className={selectedOption === option ? styles.active : ''}
              onClick={() => handleOptionChange(option)}>
              {option.title}
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
