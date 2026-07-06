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
    <div className="relative w-full space-y-2" ref={containerRef} id={id}>
      {label && (
        <label className="text-chrome-highlight block text-xs font-medium tracking-wider uppercase">
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

      <button
        type="button"
        disabled={disabled}
        onClick={() => toggleDropdown(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "bg-carbon-black/50 border-steel-grey/50 text-chrome-highlight focus:border-electric-violet flex min-h-[46px] w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-base transition-all outline-none select-none md:min-h-[42px] md:text-sm",
          isOpen && "border-electric-violet ring-electric-violet ring-1",
          error && "border-red-500/50 focus:border-red-500",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          {selectedOption ? (
            <>
              {selectedOption.iso2 ? (
                <FlagImage
                  iso2={selectedOption.iso2}
                  style={{ width: "20px", height: "15px" }}
                  className="shrink-0 rounded-sm"
                />
              ) : (
                <Globe className="text-chrome-deep h-3.5 w-4 shrink-0" />
              )}
              <span className="truncate">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-chrome-deep/40 truncate">{placeholder}</span>
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
              className="hover:bg-steel-grey/30 text-chrome-deep hover:text-chrome-highlight z-10 shrink-0 cursor-pointer rounded-full p-0.5 transition-all select-none"
            >
              <X className="h-3 w-3 stroke-[2.5]" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "text-chrome-deep h-4 w-4 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className="bg-carbon-black border-steel-grey/50 absolute right-0 left-0 z-50 mt-0.5 overflow-hidden rounded-lg border shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)]">
          {/* Search Input */}
          <div className="border-steel-grey/30 bg-carbon-black flex items-center gap-2 border-b p-2">
            <Search className="text-chrome-deep ml-1 h-3.5 w-4 shrink-0" />
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
              className="text-chrome-highlight placeholder:text-chrome-deep/40 w-full bg-transparent py-1 text-base outline-none md:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFocusedIndex(0);
                  searchInputRef.current?.focus();
                }}
                className="bg-steel-grey/35 hover:bg-steel-grey/55 text-chrome-deep hover:text-chrome-highlight mr-1 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors select-none"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-2.5 w-2.5 stroke-[2.5]" />
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
              <li className="text-chrome-deep/60 px-4 py-3 text-center text-sm">
                No se encontraron resultados
              </li>
            ) : (
              filteredOptions.map((opt, idx) => {
                if (opt.value === "divider") {
                  return <li key={opt.value} className="bg-steel-grey/30 mx-2 my-1 h-px" />;
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
                      "text-chrome-highlight hover:bg-steel-grey/30 flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-base transition-colors select-none hover:text-white md:text-sm",
                      isSelected &&
                        "bg-electric-violet/10 text-electric-violet hover:bg-electric-violet/15 hover:text-electric-violet font-semibold",
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
                      <Globe className="text-chrome-deep h-3.5 w-4 shrink-0" />
                    )}
                    <span>{opt.label}</span>
                  </button>
                );
              })
            )}
          </ul>
        </div>
      )}

      {error && <p className="ml-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default CountrySelect;
