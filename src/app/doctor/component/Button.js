// Button.js
import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
    const baseClasses = "px-4 py-2 rounded-md font-semibold text-white";
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700",
        secondary: "bg-gray-600 hover:bg-gray-700",
        destructive: "bg-red-600 hover:bg-red-700",
        // Add more variants as needed
    };

    return (
        <button type={type} className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
