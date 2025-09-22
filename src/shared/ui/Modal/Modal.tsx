import { type ReactNode, type FC, type MouseEventHandler, type KeyboardEventHandler } from "react";
import { createPortal } from "react-dom";
import { ModalHeader } from "./ModalHeader";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import styles from "./Modal.module.css";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
}

const ModalComponent: FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    children, 
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className = ''
}) => {
    if (!isOpen) return null;

    const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (closeOnEscape && event.key === 'Escape') {
            onClose();
        }
    };

    return createPortal(
        <div 
            className={styles.overlay} 
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div className={`${styles.modal} ${className}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export const Modal = ModalComponent as FC<ModalProps> & {
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
    Footer: typeof ModalFooter;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
