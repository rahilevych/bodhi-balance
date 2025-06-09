import React from 'react';
import styles from './Button.module.css';

interface Props {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}
const Button: React.FC<Props> = ({
  text,
  type = 'button',
  className,
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${className || ''}`}
      {...rest}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
