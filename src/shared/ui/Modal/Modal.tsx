import React, { type ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={onClose}
        >
            <div
                style={{ background: "white", padding: "20px", borderRadius: "8px" }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <button onClick={onClose} style={{ marginTop: "10px" }}>Закрыть</button>
            </div>
        </div>,
        document.body
    );
};
