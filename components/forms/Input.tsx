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
            className="text-chrome-highlight block text-xs font-medium tracking-wider uppercase"
          >
            {label}
            {required && (
              <sup
                aria-hidden="true"
                className="ml-0.5 font-sans text-[10px] font-normal text-red-400 select-none"
              >
                *
              </sup>
            )}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          required={required}
          className={cn(
            "bg-carbon-black/50 border-steel-grey/50 text-chrome-highlight placeholder-chrome-deep/40 focus:border-electric-violet focus:ring-electric-violet min-h-[46px] w-full rounded-lg border px-4 py-3 text-base transition-all outline-none focus:ring-1 md:min-h-[42px] md:text-sm",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="ml-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
