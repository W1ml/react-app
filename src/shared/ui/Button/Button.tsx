import React, { type ButtonHTMLAttributes } from "react";
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button {...props}
        className={styles.button}>
            {children}
        </button>
    );
};
