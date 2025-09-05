import { type ButtonHTMLAttributes } from "react";
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props}
        className={styles.button}>
            {children}
        </button>
    );
};
