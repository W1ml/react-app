import { type FC, type PropsWithChildren } from "react";
import styles from "./Modal.module.css";

export interface ModalBodyProps extends PropsWithChildren {
    className?: string;
}

export const ModalBody: FC<ModalBodyProps> = ({ children, className = '' }) => (
    <div className={`${styles.body} ${className}`}>
        {children}
    </div>
);
