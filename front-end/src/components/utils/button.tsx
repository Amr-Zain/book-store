import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, disabled, ...attrs }: ButtonProps) => {
  return (
    <button
      {...attrs}
      disabled={disabled}
      className={`bg-primary hover:bg-secondary transition-all duration-200
                  py-2 px-6 rounded focus:outline-none whitespace-nowrap
                  text-white font-bold ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-secondary"
                  } ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;