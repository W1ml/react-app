import { type ReactNode, type FC } from "react";
import styles from "./Modal.module.css";

interface ModalHeaderProps {
    children: ReactNode;
    onClose?: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ children, onClose }) => (
    <div className={styles.header}>
        {children}
        {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
                ×
            </button>
        )}
    </div>
);
