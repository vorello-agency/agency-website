import React, { useState, useRef, useEffect, useMemo } from "react";
import { FlagImage } from "react-international-phone";
import { Globe, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CountryOption {
  value: string;
  label: string;
  iso2: string;
}

interface CountrySelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: readonly CountryOption[] | CountryOption[];
  id?: string;
  placeholder?: string;
  disabled?: boolean;
}

const normalizeString = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  error,
  required,
  value,
  onChange,
  options,
  id,
  placeholder = "Selecciona tu país",
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const normalizedQuery = normalizeString(searchQuery);
    return options.filter((opt) => {
      if (opt.value === "divider") return false;
      return normalizeString(opt.label).includes(normalizedQuery);
    });
  }, [options, searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll active keyboard item into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const activeElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [focusedIndex]);

  // Safe toggle/open handler that resets state on close
  const toggleDropdown = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchQuery("");
      setFocusedIndex(-1);
    }
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        let next = prev + 1;
        while (next < filteredOptions.length && filteredOptions[next].value === "divider") {
          next++;
        }
        return next < filteredOptions.length ? next : prev;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        let next = prev - 1;
        while (next >= 0 && filteredOptions[next].value === "divider") {
          next--;
        }
        return next >= 0 ? next : prev;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
        const selected = filteredOptions[focusedIndex];
        if (selected && selected.value !== "divider") {
          onChange(selected.value);
          toggleDropdown(false);
        }
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      toggleDropdown(false);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        toggleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleGlobalEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleDropdown(false);
      }
    };
    document.addEventListener("keydown", handleGlobalEscape);
    return () => document.removeEventListener("keydown", handleGlobalEscape);
  }, []);

  return (
    <div className="w-full space-y-2 relative" ref={containerRef} id={id}>
      {label && (
        <label className="block text-xs uppercase tracking-wider text-chrome-highlight font-medium">
          {label}
          {required && (
            <sup aria-hidden="true" className="text-red-400 ml-0.5 text-[10px] font-sans font-normal select-none">
              *
            </sup>
          )}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => toggleDropdown(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "w-full bg-carbon-black/50 border border-steel-grey/50 rounded-lg px-4 py-3 text-base md:text-sm text-chrome-highlight focus:border-electric-violet outline-none transition-all flex items-center justify-between cursor-pointer select-none min-h-[46px] md:min-h-[42px]",
          isOpen && "border-electric-violet ring-1 ring-electric-violet",
          error && "border-red-500/50 focus:border-red-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex items-center gap-3">
          {selectedOption ? (
            <>
              {selectedOption.iso2 ? (
                <FlagImage
                  iso2={selectedOption.iso2}
                  style={{ width: "20px", height: "15px" }}
                  className="shrink-0 rounded-sm"
                />
              ) : (
                <Globe className="w-4 h-3.5 text-chrome-deep shrink-0" />
              )}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-chrome-deep/40">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedOption && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Limpiar selección"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onChange("");
                }
              }}
              className="p-0.5 rounded-full hover:bg-steel-grey/30 text-chrome-deep hover:text-chrome-highlight transition-all shrink-0 cursor-pointer select-none z-10"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </span>
          )}
          <ChevronDown className={cn("w-4 h-4 text-chrome-deep transition-transform duration-200 shrink-0", isOpen && "rotate-180")} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-0.5 bg-carbon-black border border-steel-grey/50 rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-steel-grey/30 flex items-center gap-2 bg-carbon-black">
            <Search className="w-4 h-3.5 text-chrome-deep shrink-0 ml-1" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFocusedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Buscar país..."
              className="w-full bg-transparent text-chrome-highlight placeholder:text-chrome-deep/40 text-base md:text-sm outline-none py-1"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFocusedIndex(0);
                  searchInputRef.current?.focus();
                }}
                className="flex items-center justify-center w-4 h-4 rounded-full bg-steel-grey/35 hover:bg-steel-grey/55 text-chrome-deep hover:text-chrome-highlight transition-colors shrink-0 cursor-pointer select-none mr-1"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-2.5 h-2.5 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Scrollable list */}
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-[180px] overflow-y-auto py-1"
            data-lenis-prevent="true"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-chrome-deep/60 text-sm text-center">
                No se encontraron resultados
              </li>
            ) : (
              filteredOptions.map((opt, idx) => {
                if (opt.value === "divider") {
                  return (
                    <li key={opt.value} className="h-px bg-steel-grey/30 my-1 mx-2" />
                  );
                }

                const isSelected = opt.value === value;
                const isFocused = idx === focusedIndex;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      const nextValue = opt.value === value ? "" : opt.value;
                      onChange(nextValue);
                      toggleDropdown(false);
                    }}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-4 py-2.5 text-base md:text-sm text-chrome-highlight cursor-pointer hover:bg-steel-grey/30 hover:text-white transition-colors select-none",
                      isSelected && "bg-electric-violet/10 text-electric-violet font-semibold hover:bg-electric-violet/15 hover:text-electric-violet",
                      isFocused && "bg-steel-grey/30 text-white"
                    )}
                  >
                    {opt.iso2 ? (
                      <FlagImage
                        iso2={opt.iso2}
                        style={{ width: "20px", height: "15px" }}
                        className="shrink-0 rounded-sm"
                      />
                    ) : (
                      <Globe className="w-4 h-3.5 text-chrome-deep shrink-0" />
                    )}
                    <span>{opt.label}</span>
                  </button>
                );
              })
            )}
          </ul>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs ml-1">{error}</p>
      )}
    </div>
  );
};

export default CountrySelect;
