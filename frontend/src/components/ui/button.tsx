import React from 'react';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large' | 'icon';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = 'outline',
  size = 'small',
  onClick,
  children,
  className = '',
}) => {
  const baseStyles = 'py-2 px-4 rounded focus:outline-none';
  const variantStyles = variant === 'outline'
    ? 'border border-gray-400 text-gray-700 bg-white hover:bg-gray-100'
    : 'bg-blue-600 text-white hover:bg-blue-700';
  const sizeStyles = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
