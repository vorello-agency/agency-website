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
                  className={`flex items-center gap-2 group transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/60 focus-visible:border-emerald-500/60 rounded-lg px-2 py-1 -mx-2 -my-1 ${
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
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-400 group-hover:text-emerald-300"
                        : isActive
                        ? "border-chrome-deep bg-chrome-deep/10 text-chrome-deep shadow-[0_0_10px_rgba(123,76,255,0.25)]"
                        : "border-steel-grey/40 bg-transparent text-chrome-deep"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      stepNum
                    )}
                  </span>

                  {/* Step label */}
                  <span
                    className={`text-xs font-medium tracking-wide transition-colors duration-200 ${
                      isCompleted
                        ? "text-emerald-400 group-hover:text-emerald-300"
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
                  <div className="flex-1 mx-4 h-px relative">
                    <div className="absolute inset-0 bg-steel-grey/25 rounded-full" />
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out ${
                        isCompleted
                          ? "bg-linear-to-r from-teal-300 to-green-500"
                          : "bg-linear-to-r from-neon-blue to-electric-violet"
                      }`}
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
                  className={`outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/60 rounded-full p-0.5 -m-0.5 ${isCompleted ? "cursor-pointer" : "cursor-default"}`}
                  aria-label={`Paso ${stepNum}: ${label}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                        : isActive
                        ? "border-chrome-deep bg-chrome-deep/10 text-chrome-deep shadow-[0_0_10px_rgba(123,76,255,0.25)]"
                        : "border-steel-grey/40 bg-transparent text-chrome-deep"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      stepNum
                    )}
                  </span>
                </button>

                {idx < STEP_LABELS.length - 1 && (
                  <div className="flex-1 mx-2 h-px relative">
                    <div className="absolute inset-0 bg-steel-grey/25 rounded-full" />
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out ${
                        isCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          : "bg-gradient-to-r from-emerald-500 to-chrome-deep"
                      }`}
                      style={{ width: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        {/* Active step label on mobile */}
        <p className="text-center text-xs uppercase tracking-widest text-chrome-deep mt-4 font-semibold">
          Paso {currentStep}: {STEP_LABELS[currentStep - 1]}
        </p>
      </nav>
    </div>
  );
};

export default StepperNav;
