import React from "react";
import { PROJECT_TYPES, BUDGET_RANGES, DEADLINES } from "../_lib/start-data";
import { Calendar, DollarSign } from "lucide-react";

interface SelectionSummaryProps {
  formData: {
    projectType: string;
    budget: string;
    deadline: string;
  };
}

function getSelectedOption(
  value: string,
  list: readonly { value: string; label: string; icon: React.ComponentType<{ className?: string }> }[]
) {
  return list.find((item) => item.value === value) ?? null;
}

function getProjectOption(id: string) {
  return PROJECT_TYPES.find((p) => p.id === id) ?? null;
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ formData }) => {
  const projectOpt = getProjectOption(formData.projectType);
  const budgetOpt = getSelectedOption(formData.budget, BUDGET_RANGES);
  const deadlineOpt = getSelectedOption(formData.deadline, DEADLINES);

  const items = [
    { label: "Proyecto", value: projectOpt?.label ?? "—", icon: projectOpt?.icon },
    { label: "Presupuesto", value: budgetOpt?.label ?? "—", icon: DollarSign },
    { label: "Plazo", value: deadlineOpt?.label ?? "—", icon: Calendar },
  ];

  return (
    <details
      open
      className="bg-steel-grey/10 border border-steel-grey/25 rounded-xl overflow-hidden group"
    >
      <summary className="px-4 py-2 flex items-center justify-between cursor-pointer text-xs uppercase tracking-wider text-chrome-deep hover:text-chrome-highlight transition-colors select-none">
        <span>Resumen de tus selecciones</span>
        <svg
          className="w-4 h-4 transition-transform duration-200 group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <hr />
      <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-chrome-deep uppercase tracking-wider block">
                {Icon && (
                  <div className="w-5 h-5 rounded bg-steel-grey/15 border border-steel-grey/25 flex items-center justify-center text-chrome-highlight shrink-0">
                    <Icon className="w-3 h-3" />
                  </div>
                )}
                {item.label}
              </div>
              <hr />
              <div className="flex items-center gap-2 pt-1 mt-1">

                <span className="text-xs text-chrome-highlight font-medium truncate block">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
};

export default SelectionSummary;
