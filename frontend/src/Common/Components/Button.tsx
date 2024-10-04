import React from 'react';

export interface ButtonProps { // Ensure ButtonProps is exported
  type?: "button" | "submit" | "reset";
  variant?: 'default' | 'outline' | 'ghost' | 'success' | 'danger'; // Added 'success' and 'danger'
  size?: 'small' | 'medium' | 'large' | 'icon';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean; // New prop for full-width buttons
  disabled?: boolean; // Add disabled property
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type = "button",
    variant = 'default',
    size = 'medium',
    onClick,
    children,
    className = '',
    fullWidth = false, // Default to false
    disabled = false, // Default to false
  } = props;

  const baseStyles = 'py-2 px-4 rounded focus:outline-none';
  const variantStyles = 
    variant === 'outline' ? 'border border-gray-400 text-gray-700 bg-white hover:bg-gray-100' :
    variant === 'ghost' ? 'text-gray-700 bg-transparent hover:bg-gray-100' :
    variant === 'success' ? 'bg-green-500 text-white hover:bg-green-600' :
    variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
    'bg-blue-600 text-white hover:bg-blue-700';
  const sizeStyles = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${disabledStyles} ${className}`}
      disabled={disabled} // Apply disabled attribute
    >
      {children}
    </button>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} variant="default" />
);

export const OutlineButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} variant="outline" />
);

export const GhostButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} variant="ghost" />
);

export const SuccessButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} variant="success" />
);

export const DangerButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} variant="danger" />
);

export const IconButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} size="icon" />
);

export default Button;

