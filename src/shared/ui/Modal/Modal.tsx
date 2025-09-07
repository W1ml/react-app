import { type ReactNode, type FC } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

interface ModalHeaderProps {
    children: ReactNode;
    onClose?: () => void;
}

interface ModalBodyProps {
    children: ReactNode;
}

interface ModalFooterProps {
    children: ReactNode;
}

const ModalHeader: FC<ModalHeaderProps> = ({ children, onClose }) => (
    <div className={styles.header}>
        {children}
        {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
                ×
            </button>
        )}
    </div>
);

const ModalBody: FC<ModalBodyProps> = ({ children }) => (
    <div className={styles.body}>
        {children}
    </div>
);

const ModalFooter: FC<ModalFooterProps> = ({ children }) => (
    <div className={styles.footer}>
        {children}
    </div>
);

const ModalComponent: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export const Modal = ModalComponent as FC<ModalProps> & {
    Header: FC<ModalHeaderProps>;
    Body: FC<ModalBodyProps>;
    Footer: FC<ModalFooterProps>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
