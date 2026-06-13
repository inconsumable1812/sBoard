import {type ButtonHTMLAttributes, type PropsWithChildren} from 'react';
import styles from './Button.module.scss';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const Button = ({children, className, ...props}: Props) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};
