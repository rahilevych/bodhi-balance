import React from 'react';
import styles from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}
const Button: React.FC<Props> = ({ text, className, ...rest }) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...rest}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
