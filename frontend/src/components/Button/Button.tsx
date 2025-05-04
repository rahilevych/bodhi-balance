import React from 'react';
import styles from './Button.module.css';
import { FiChevronRight } from 'react-icons/fi';

interface Props {
  text: string;
  type?: 'button' | 'submit' | 'reset';
}
const Button: React.FC<Props> = ({ text, type = 'button' }) => {
  return (
    <button type={type} className={styles.button}>
      <span>{text}</span>
      <FiChevronRight className={styles.icon} />
    </button>
  );
};

export default Button;
