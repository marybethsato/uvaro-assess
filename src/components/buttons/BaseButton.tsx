import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const BaseButton = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md cursor-pointer disabled:bg-lightGray disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
