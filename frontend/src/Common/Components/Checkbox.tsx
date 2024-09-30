import React from 'react';

interface CheckboxProps {
    id: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onChange, className }) => {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className={`form-checkbox h-4 w-4 text-sky-600 ${className}`}
        />
    );
};

export default Checkbox;
