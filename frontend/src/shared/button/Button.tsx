import React from 'react';
import styles from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
const Button = ({ children, className, ...props }: Props) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
