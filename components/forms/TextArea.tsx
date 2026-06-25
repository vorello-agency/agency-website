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
            className="block text-xs uppercase tracking-wider text-chrome-highlight font-medium"
          >
            {label}
            {required && <sup aria-hidden="true" className="text-red-400 ml-0.5 text-[10px] font-sans font-normal select-none">*</sup>}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          required={required}
          className={cn(
            "w-full bg-carbon-black/50 border border-steel-grey/50 rounded-lg px-4 py-3.5 text-base md:text-sm text-chrome-highlight placeholder-chrome-deep/40 focus:border-electric-violet focus:ring-1 focus:ring-electric-violet outline-none transition-all resize-y min-h-[120px]",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-red-400 text-xs mt-1.5">{error}</p>
        ) : (
          hint && <div className="mt-1.5">{hint}</div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
