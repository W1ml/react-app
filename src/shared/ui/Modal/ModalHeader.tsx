import { type FC, type PropsWithChildren, type MouseEventHandler } from "react";
import styles from "./Modal.module.css";

export interface ModalHeaderProps extends PropsWithChildren {
    onClose?: () => void;
    className?: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ children, onClose, className = '' }) => {
    const handleCloseClick: MouseEventHandler<HTMLButtonElement> = () => {
        onClose?.();
    };

    return (
        <div className={`${styles.header} ${className}`}>
            {children}
            {onClose && (
                <button 
                    className={styles.closeButton} 
                    onClick={handleCloseClick}
                    type="button"
                    aria-label="Закрыть модальное окно"
                >
                    ×
                </button>
            )}
        </div>
    );
};
