import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, required, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-xs uppercase tracking-wider text-chrome-highlight font-medium"
          >
            {label}
            {required && <sup aria-hidden="true" className="text-red-400 ml-0.5 text-[10px] font-sans font-normal select-none">*</sup>}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          required={required}
          className={cn(
            "w-full bg-carbon-black/50 border border-steel-grey/50 rounded-lg px-4 py-3 text-base md:text-sm text-chrome-highlight placeholder-chrome-deep/40 focus:border-electric-violet focus:ring-1 focus:ring-electric-violet outline-none transition-all min-h-[46px] md:min-h-[42px]",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
