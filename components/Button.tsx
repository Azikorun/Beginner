
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
        {children}
    </button>
);

export default Button;
