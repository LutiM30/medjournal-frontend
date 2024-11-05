import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}) => {
  const baseClasses =
    'px-4 py-2 rounded-md font-semibold text-white transition duration-300 ease-in-out transform';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 hover:scale-105',
    secondary: 'bg-gray-600 hover:bg-gray-700 hover:scale-105',
    destructive: 'bg-red-600 hover:bg-red-700 hover:scale-105',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
