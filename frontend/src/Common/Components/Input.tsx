import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={`border rounded px-3 py-2 ${className}`}
            {...props}
        />
    );
};
