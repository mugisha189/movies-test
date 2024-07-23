import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "red" | "blue";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  onClick,
  children,
  type = "button",
  disabled = false,
  loading = false,
}) => {
  const baseStyles =
    "p-2 px-4 rounded-xl focus:outline-none";
  let variantStyles = "";

  if (variant === "primary") {
    variantStyles = "bg-primary text-white";
  } else if (variant === "secondary") {
    variantStyles = "border border-primary text-primary";
  } else if (variant === "blue") {
    variantStyles = "bg-myBlue border-blue-900 border text-white";
  } else if (variant === "red") {
    variantStyles = "bg-myRed border-red-900 border text-white";
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className} `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
