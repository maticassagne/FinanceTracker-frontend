import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, icon, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input ref={ref} className={`w-full border border-gray-200 rounded-lg px-4 py-2 ${icon ? "pl-10" : ""} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${error ? "border-red-500" : ""} ${className}`} {...props} />
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
