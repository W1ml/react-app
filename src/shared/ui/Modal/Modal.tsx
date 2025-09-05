import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    return createPortal(
        isOpen ? (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={styles.closeButton} onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>) : null,
        document.body
    );
};
