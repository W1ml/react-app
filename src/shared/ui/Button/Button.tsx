import { type ButtonHTMLAttributes } from "react";
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...props }: ButtonProps) => {
    const buttonClass = className ? `${styles.button} ${className}` : styles.button;
    
    return (
        <button {...props} className={buttonClass}>
            {children}
        </button>
    );
};
