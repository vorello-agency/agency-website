import React from "react";
import { Check } from "lucide-react";
import { STEP_LABELS } from "../_lib/start-data";

interface StepperNavProps {
  currentStep: number;
  onStepClick: (step: 1 | 2 | 3 | 4) => void;
}

const StepperNav: React.FC<StepperNavProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="mb-8">
      {/* Desktop stepper */}
      <nav aria-label="Progreso del formulario" className="hidden sm:block">
        <ol className="flex w-full items-center">
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
                  className={`group -mx-2 -my-1 flex items-center gap-2 rounded-lg px-2 py-1 transition-all duration-200 outline-none focus-visible:border-emerald-500/60 focus-visible:ring-1 focus-visible:ring-emerald-500/60 ${
                    isClickable ? "cursor-pointer" : "cursor-default"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Paso ${stepNum}: ${label}${
                    isCompleted ? " (completado)" : isActive ? " (actual)" : ""
                  }`}
                >
                  {/* Step circle */}
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300"
                        : isActive
                          ? "border-chrome-deep bg-chrome-deep/10 text-chrome-deep shadow-[0_0_10px_rgba(123,76,255,0.25)]"
                          : "border-steel-grey/40 text-chrome-deep bg-transparent"
                    }`}
                  >
                    {isCompleted ? <Check className="h-3 w-3" aria-hidden="true" /> : stepNum}
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
                  <div className="relative mx-4 h-px flex-1">
                    <div className="bg-steel-grey/25 absolute inset-0 rounded-full" />
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out ${
                        isCompleted
                          ? "bg-linear-to-r from-teal-300 to-green-500"
                          : "from-neon-blue to-electric-violet bg-linear-to-r"
                      }`}
                      style={{
                        width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                      }}
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
        <ol className="flex w-full items-center justify-between">
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
                  className={`-m-0.5 rounded-full p-0.5 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/60 ${isCompleted ? "cursor-pointer" : "cursor-default"}`}
                  aria-label={`Paso ${stepNum}: ${label}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : isActive
                          ? "border-chrome-deep bg-chrome-deep/10 text-chrome-deep shadow-[0_0_10px_rgba(123,76,255,0.25)]"
                          : "border-steel-grey/40 text-chrome-deep bg-transparent"
                    }`}
                  >
                    {isCompleted ? <Check className="h-3 w-3" aria-hidden="true" /> : stepNum}
                  </span>
                </button>

                {idx < STEP_LABELS.length - 1 && (
                  <div className="relative mx-2 h-px flex-1">
                    <div className="bg-steel-grey/25 absolute inset-0 rounded-full" />
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out ${
                        isCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          : "to-chrome-deep bg-gradient-to-r from-emerald-500"
                      }`}
                      style={{
                        width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                      }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        {/* Active step label on mobile */}
        <p className="text-chrome-deep mt-4 text-center text-xs font-semibold tracking-widest uppercase">
          Paso {currentStep}: {STEP_LABELS[currentStep - 1]}
        </p>
      </nav>
    </div>
  );
};

export default StepperNav;
