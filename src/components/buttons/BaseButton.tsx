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
      className={`px-7 py-3 rounded-md cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
