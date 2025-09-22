import type { FC,  PropsWithChildren } from "react";
import styles from "./Modal.module.css";

export interface ModalFooterProps extends PropsWithChildren {
    className?: string;
}

export const ModalFooter: FC<ModalFooterProps> = ({ children, className = '' }) => (
    <div className={`${styles.footer} ${className}`}>
        {children}
    </div>
);
