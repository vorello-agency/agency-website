import React from "react";
import { Check } from "lucide-react";
import { STEP_LABELS } from "../_lib/start-data";

interface StepperNavProps {
  currentStep: number;
  onStepClick: (step: 1 | 2 | 3 | 4) => void;
}

const StepperNav: React.FC<StepperNavProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="mb-8">
      {/* Desktop stepper */}
      <nav aria-label="Progreso del formulario" className="hidden sm:block">
        <ol className="flex items-center w-full">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            const isClickable = isCompleted;

            return (
              <li
                key={label}
                className={`flex items-center ${idx < STEP_LABELS.length - 1 ? "flex-1" : ""}`}
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(stepNum as 1 | 2 | 3 | 4)}
                  className={`flex items-center gap-2 group transition-all duration-200 ${
                    isClickable ? "cursor-pointer" : "cursor-default"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Paso ${stepNum}: ${label}${
                    isCompleted ? " (completado)" : isActive ? " (actual)" : ""
                  }`}
                >
                  {/* Step circle */}
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 shrink-0 ${
                      isCompleted
                        ? "bg-electric-violet/20 border-electric-violet text-electric-violet group-hover:bg-electric-violet/30"
                        : isActive
                        ? "border-electric-violet bg-electric-violet/10 text-electric-violet shadow-[0_0_10px_rgba(123,76,255,0.25)]"
                        : "border-steel-grey/40 bg-transparent text-chrome-deep"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      stepNum
                    )}
                  </span>

                  {/* Step label */}
                  <span
                    className={`text-xs font-medium tracking-wide transition-colors duration-200 ${
                      isCompleted
                        ? "text-electric-violet group-hover:text-electric-violet/80"
                        : isActive
                        ? "text-chrome-highlight"
                        : "text-chrome-deep"
                    }`}
                  >
                    {label}
                  </span>
                </button>

                {/* Connector line */}
                {idx < STEP_LABELS.length - 1 && (
                  <div className="flex-1 mx-3 h-px relative">
                    <div className="absolute inset-0 bg-steel-grey/25 rounded-full" />
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-violet to-neon-blue rounded-full transition-all duration-500 ease-out"
                      style={{ width: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile stepper (compact: numbers + lines only) */}
      <nav aria-label="Progreso del formulario" className="sm:hidden">
        <ol className="flex items-center justify-between w-full">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;

            return (
              <li
                key={label}
                className={`flex items-center ${idx < STEP_LABELS.length - 1 ? "flex-1" : ""}`}
              >
                <button
                  type="button"
                  disabled={!isCompleted}
                  onClick={() => isCompleted && onStepClick(stepNum as 1 | 2 | 3 | 4)}
                  className={`${isCompleted ? "cursor-pointer" : "cursor-default"}`}
                  aria-label={`Paso ${stepNum}: ${label}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-electric-violet/20 border-electric-violet text-electric-violet"
                        : isActive
                        ? "border-electric-violet bg-electric-violet/10 text-electric-violet shadow-[0_0_10px_rgba(123,76,255,0.25)]"
                        : "border-steel-grey/40 bg-transparent text-chrome-deep"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      stepNum
                    )}
                  </span>
                </button>

                {idx < STEP_LABELS.length - 1 && (
                  <div className="flex-1 mx-2 h-px relative">
                    <div className="absolute inset-0 bg-steel-grey/25 rounded-full" />
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-violet to-neon-blue rounded-full transition-all duration-500 ease-out"
                      style={{ width: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        {/* Active step label on mobile */}
        <p className="text-center text-xs uppercase tracking-widest text-electric-violet mt-3 font-semibold">
          Paso {currentStep}: {STEP_LABELS[currentStep - 1]}
        </p>
      </nav>
    </div>
  );
};

export default StepperNav;
