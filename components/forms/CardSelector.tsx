import React from "react";
import { CheckCircle2, Check } from "lucide-react";
import { gsap } from "@/lib/gsap/register";

export interface CardSelectorOption {
  id?: string;
  value?: string;
  label: string;
  description?: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CardSelectorProps {
  id?: string;
  cardIdPrefix: string;
  options: readonly CardSelectorOption[] | CardSelectorOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  theme?: "violet" | "blue";
  cardSize?: "sm" | "md";
  columnsClass?: string;
  autoSpanLastOdd?: boolean;
  showCheckmark?: boolean;
  indicator?: "none" | "radio" | "checkmark" | "dot";
}

const CardSelector: React.FC<CardSelectorProps> = ({
  id,
  cardIdPrefix,
  options,
  value,
  onChange,
  error,
  theme = "violet",
  cardSize = "sm",
  columnsClass = "grid grid-cols-1 sm:grid-cols-2 gap-3",
  autoSpanLastOdd = false,
  showCheckmark = true,
  indicator,
}) => {
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, val: string) => {
    const nextVal = value === val ? "" : val;
    onChange(nextVal);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.97 },
        { scale: 1, duration: 0.3, ease: "back.out(1.7)", overwrite: "auto" }
      );
    }
  };

  const themeConfig = {
    violet: {
      activeCard: "border-electric-violet/60 bg-electric-violet/[0.04] shadow-[0_0_15px_rgba(123,76,255,0.06)]",
      activeBadge: "bg-electric-violet/20 border-electric-violet/30 text-electric-violet",
      checkmark: "text-electric-violet",
    },
    blue: {
      activeCard: "border-neon-blue/60 bg-neon-blue/[0.04] shadow-[0_0_15px_rgba(45,143,255,0.06)]",
      activeBadge: "bg-neon-blue/20 border-neon-blue/30 text-neon-blue",
      checkmark: "text-neon-blue",
    },
  };

  const sizeConfig = {
    md: {
      padding: "p-4",
      inactiveCard: "border-steel-grey/30 bg-graphite-metal/10 hover:border-chrome-deep/60 hover:bg-graphite-metal/20 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(255,255,255,0.01)]",
      iconWrapper: "w-8 h-8 rounded-lg",
      icon: "w-4 h-4",
      checkmarkPosition: "top-2.5 right-2.5",
      checkmarkSize: "w-4 h-4",
    },
    sm: {
      padding: "p-3",
      inactiveCard: "border-steel-grey/20 bg-graphite-metal/10 hover:border-chrome-deep/45 hover:bg-graphite-metal/20 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(255,255,255,0.01)]",
      iconWrapper: "w-6 h-6 rounded-md",
      icon: "w-3 h-3",
      checkmarkPosition: "top-2 right-2",
      checkmarkSize: "w-3.5 h-3.5",
    },
  };

  const activeTheme = themeConfig[theme];
  const activeSize = sizeConfig[cardSize];

  return (
    <div className="space-y-3" id={id}>
      <div className={columnsClass}>
        {options.map((option, idx) => {
          const Icon = option.icon;
          const optionVal = option.value ?? option.id ?? "";
          const optionDesc = option.description ?? option.hint;
          const isSelected = value === optionVal;
          const isLastImparCard = autoSpanLastOdd && idx === options.length - 1 && options.length % 2 !== 0;

          return (
            <button
              key={optionVal}
              type="button"
              data-card-id={`${cardIdPrefix}-${optionVal}`}
              onClick={(e) => handleSelect(e, optionVal)}
              className={`group text-left ${activeSize.padding} rounded-xl border transition-all duration-200 select-none cursor-pointer flex items-center gap-3 text-xs relative ${
                isSelected ? activeTheme.activeCard : activeSize.inactiveCard
              } ${isLastImparCard ? "sm:col-span-2" : ""}`}
            >
              {indicator && indicator !== "none" && (
                <div className="flex items-center justify-center shrink-0">
                  {indicator === "radio" && (
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? theme === "violet"
                            ? "border-electric-violet bg-electric-violet/10"
                            : "border-neon-blue bg-neon-blue/10"
                          : "border-steel-grey/40 bg-transparent group-hover:border-steel-grey/65"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isSelected
                            ? theme === "violet"
                              ? "bg-electric-violet scale-100"
                              : "bg-neon-blue scale-100"
                            : "scale-0"
                        }`}
                      />
                    </div>
                  )}
                  {indicator === "dot" && (
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        isSelected
                          ? theme === "violet"
                            ? "bg-electric-violet shadow-[0_0_8px_rgba(123,76,255,0.6)]"
                            : "bg-neon-blue shadow-[0_0_8px_rgba(45,143,255,0.6)]"
                          : "bg-steel-grey/40 group-hover:bg-steel-grey/60"
                      }`}
                    />
                  )}
                  {indicator === "checkmark" && (
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? theme === "violet"
                            ? "border-electric-violet bg-electric-violet text-carbon-black"
                            : "border-neon-blue bg-neon-blue text-carbon-black"
                          : "border-steel-grey/40 bg-transparent group-hover:border-steel-grey/65"
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  )}
                </div>
              )}

              {Icon && (
                <div
                  className={`${activeSize.iconWrapper} flex items-center justify-center shrink-0 border transition-all duration-200 ${
                    isSelected
                      ? activeTheme.activeBadge
                      : "bg-steel-grey/25 border-steel-grey/30 text-chrome-deep group-hover:border-steel-grey/50 group-hover:text-chrome-highlight"
                  }`}
                >
                  <Icon className={activeSize.icon} />
                </div>
              )}
              <div className="space-y-0.5 pr-4 flex-1">
                <span
                  className={`font-semibold block transition-colors duration-200 ${
                    isSelected ? "text-chrome-highlight" : "text-copy-muted group-hover:text-chrome-highlight"
                  }`}
                >
                  {option.label}
                </span>
                {optionDesc && (
                  <span className="text-chrome-deep text-xs block leading-normal text-balance transition-colors duration-200 group-hover:text-copy-muted">
                    {optionDesc}
                  </span>
                )}
              </div>
              {showCheckmark && isSelected && !indicator && (
                <CheckCircle2
                  className={`absolute ${activeSize.checkmarkPosition} ${activeSize.checkmarkSize} ${activeTheme.checkmark}`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default CardSelector;
