import React, { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    className?: string;
}

export const Label: React.FC<LabelProps> = ({ className, ...props }) => {
    return (
        <label
            className={`block text-sm font-medium text-gray-700 ${className}`}
            {...props}
        />
    );
};
