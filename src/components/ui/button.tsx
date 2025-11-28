import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({ variant = "primary", size = "md", isLoading = false, children, disabled, className = "", ...props }: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button disabled={disabled || isLoading} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {isLoading && <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}
