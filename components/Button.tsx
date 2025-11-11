interface ButtonProps {
    onClick: () => void;
    children: string | HTMLElement;
    className?: string;
    disabled?: boolean;
}

export const Button = ({ onClick, children, className = '', disabled = false }: ButtonProps): HTMLButtonElement => {
    const button = document.createElement('button');
    button.onclick = onClick;
    button.disabled = disabled;
    button.className = `bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
    
    if (typeof children === 'string') {
        button.textContent = children;
    } else {
        button.appendChild(children);
    }

    return button;
};
