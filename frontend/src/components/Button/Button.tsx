import React from 'react';
import styles from './Button.module.css';
import { FiChevronRight } from 'react-icons/fi';

interface Props {
  text: string;
}
const Button: React.FC<Props> = ({ text }) => {
  return (
    <div className={`${styles.button} `}>
      <span>{text}</span>
      <FiChevronRight className={styles.icon} />
    </div>
  );
};

export default Button;
