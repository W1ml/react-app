import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button {...props} style={{ padding: "8px 12px", margin: "4px" }}>
            {children}
        </button>
    );
};
