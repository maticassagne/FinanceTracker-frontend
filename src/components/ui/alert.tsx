import * as React from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Alert({ variant = "info", title, children, onClose }: AlertProps) {
  const variants = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: Info,
      text: "text-blue-700",
      title: "text-blue-900",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: CheckCircle,
      text: "text-green-700",
      title: "text-green-900",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: AlertCircle,
      text: "text-yellow-700",
      title: "text-yellow-900",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: XCircle,
      text: "text-red-700",
      title: "text-red-900",
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4 flex gap-3`}>
      <Icon className={`w-5 h-5 ${config.text} shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && <p className={`${config.title} font-semibold text-sm mb-1`}>{title}</p>}
        <p className={`${config.text} text-sm`}>{children}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className={`${config.text} hover:opacity-75 shrink-0`}>
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
