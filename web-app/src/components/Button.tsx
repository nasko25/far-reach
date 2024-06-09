import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-black text-white rounded-md w-full text-center hover:bg-gray-800 ${className}`}
    >
      {children}
    </button>
  );
};
