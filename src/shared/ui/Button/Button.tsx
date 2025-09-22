import type { ButtonHTMLAttributes, PropsWithChildren, MouseEventHandler } from "react";
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ 
    children, 
    className = '', 
    variant = 'primary',
    size = 'medium',
    onClick,
    ...props 
}: PropsWithChildren<ButtonProps>) => {
    const buttonClass = [
        styles.button,
        styles[variant],
        styles[size],
        className
    ].filter(Boolean).join(' ');
    
    return (
        <button 
            {...props} 
            className={buttonClass}
            onClick={onClick}
            type={props.type || 'button'}
        >
            {children}
        </button>
    );
};
