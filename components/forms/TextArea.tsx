import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: React.ReactNode;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, className, id, required, ...props }, ref) => {
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
        <textarea
          id={id}
          ref={ref}
          required={required}
          className={cn(
            "bg-carbon-black/50 border-steel-grey/50 text-chrome-highlight placeholder-chrome-deep/40 focus:border-electric-violet focus:ring-electric-violet min-h-[120px] w-full resize-y rounded-lg border px-4 py-3.5 text-base transition-all outline-none focus:ring-1 md:text-sm",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        ) : (
          hint && <div className="mt-1.5">{hint}</div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
