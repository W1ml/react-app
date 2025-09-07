import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type Size = 'small' | 'medium' | 'large';
type Variant = 'primary' | 'back';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: Size;
    variant?: Variant;
    to?: string; // Для Link
}

export const Button = ({ 
    children, 
    size = 'medium', 
    variant = 'primary',
    to,
    className = '',
    ...props 
}: ButtonProps) => {
    const buttonClass = [
        styles.button,
        size !== 'medium' ? styles[size] : '',
        variant === 'back' ? styles.back : '',
        className
    ].filter(Boolean).join(' ');
    
    if (to) {
        return (
            <Link to={to} className={buttonClass}>
                {children}
            </Link>
        );
    }
    
    return (
        <button {...props} className={buttonClass}>
            {children}
        </button>
    );
};
