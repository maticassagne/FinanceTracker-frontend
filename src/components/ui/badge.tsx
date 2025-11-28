import * as React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "danger" | "warning" | "info";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-900",
    success: "bg-green-100 text-green-900",
    danger: "bg-red-100 text-red-900",
    warning: "bg-yellow-100 text-yellow-900",
    info: "bg-blue-100 text-blue-900",
  };

  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>;
}
