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
  list: readonly {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[]
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
    {
      label: "Proyecto",
      value: projectOpt?.label ?? "—",
      icon: projectOpt?.icon,
    },
    { label: "Presupuesto", value: budgetOpt?.label ?? "—", icon: DollarSign },
    { label: "Plazo", value: deadlineOpt?.label ?? "—", icon: Calendar },
  ];

  return (
    <details
      open
      className="bg-steel-grey/10 border-steel-grey/25 group overflow-hidden rounded-xl border"
    >
      <summary className="text-chrome-deep hover:text-chrome-highlight flex cursor-pointer items-center justify-between px-4 py-2 text-xs tracking-wider uppercase transition-colors select-none">
        <span>Resumen de tus selecciones</span>
        <svg
          className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
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
      <div className="mt-4 grid grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-1">
              <div className="text-chrome-deep block flex items-center gap-2 text-xs tracking-wider uppercase">
                {Icon && (
                  <div className="bg-steel-grey/15 border-steel-grey/25 text-chrome-highlight flex h-5 w-5 shrink-0 items-center justify-center rounded border">
                    <Icon className="h-3 w-3" />
                  </div>
                )}
                {item.label}
              </div>
              <hr />
              <div className="mt-1 flex items-center gap-2 pt-1">
                <span className="text-chrome-highlight block truncate text-xs font-medium">
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
