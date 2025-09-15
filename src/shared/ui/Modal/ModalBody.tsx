import { type ReactNode, type FC } from "react";
import styles from "./Modal.module.css";

interface ModalBodyProps {
    children: ReactNode;
}

export const ModalBody: FC<ModalBodyProps> = ({ children }) => (
    <div className={styles.body}>
        {children}
    </div>
);
