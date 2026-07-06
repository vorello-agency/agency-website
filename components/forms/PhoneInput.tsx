import React, { forwardRef, useState, useMemo, useRef, useEffect } from "react";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
} from "react-international-phone";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import "react-international-phone/style.css";

interface PhoneInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (phone: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
}

const normalizeString = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const guessUserCountry = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      const lowerTz = tz.toLowerCase();
      if (lowerTz.includes("montevideo")) return "uy";
      if (lowerTz.includes("buenos_aires") || lowerTz.includes("argentina")) return "ar";
      if (lowerTz.includes("madrid") || lowerTz.includes("canary")) return "es";
      if (lowerTz.includes("santiago")) return "cl";
      if (lowerTz.includes("bogota")) return "co";
      if (
        lowerTz.includes("mexico_city") ||
        lowerTz.includes("monterrey") ||
        lowerTz.includes("tijuana")
      )
        return "mx";
      if (lowerTz.includes("lima")) return "pe";
      if (lowerTz.includes("quito")) return "ec";
      if (lowerTz.includes("caracas")) return "ve";
      if (lowerTz.includes("la_paz")) return "bo";
      if (lowerTz.includes("asuncion")) return "py";
      if (lowerTz.includes("guatemala")) return "gt";
      if (lowerTz.includes("san_jose")) return "cr";
      if (lowerTz.includes("panama")) return "pa";
      if (lowerTz.includes("santo_domingo")) return "do";
      if (lowerTz.includes("san_salvador")) return "sv";
      if (lowerTz.includes("tegucigalpa")) return "hn";
      if (lowerTz.includes("managua")) return "ni";
      if (lowerTz.includes("havana")) return "cu";
      if (lowerTz.includes("london")) return "gb";
      if (lowerTz.includes("lisbon")) return "pt";
      if (lowerTz.includes("paris")) return "fr";
      if (lowerTz.includes("berlin")) return "de";
      if (lowerTz.includes("rome")) return "it";
      if (lowerTz.includes("amsterdam")) return "nl";
      if (lowerTz.includes("brussels")) return "be";
      if (lowerTz.includes("zurich")) return "ch";
      if (lowerTz.includes("vienna")) return "at";
      if (lowerTz.includes("stockholm")) return "se";
      if (lowerTz.includes("oslo")) return "no";
      if (lowerTz.includes("copenhagen")) return "dk";
      if (lowerTz.includes("helsinki")) return "fi";
      if (lowerTz.includes("dublin")) return "ie";
      if (
        lowerTz.includes("new_york") ||
        lowerTz.includes("chicago") ||
        lowerTz.includes("denver") ||
        lowerTz.includes("los_angeles") ||
        lowerTz.includes("phoenix") ||
        lowerTz.includes("anchorage") ||
        lowerTz.includes("honolulu")
      ) {
        return "us";
      }
    }
  } catch {
    // Ignore error
  }

  // Fallback to browser language
  try {
    const lang =
      typeof navigator !== "undefined"
        ? navigator.language || (navigator.languages && navigator.languages[0])
        : "";
    if (lang) {
      const code = lang.split("-")[1]?.toLowerCase();
      if (code && code.length === 2) {
        return code;
      }
    }
  } catch {
    // Ignore error
  }

  return "uy"; // default fallback
};

const isOnlyDialCode = (cleanPhone: string): boolean => {
  if (!cleanPhone.startsWith("+")) return false;

  const phoneWithoutPlus = cleanPhone.substring(1);
  const sortedCountries = [...defaultCountries].sort((a, b) => {
    const dialA = parseCountry(a).dialCode;
    const dialB = parseCountry(b).dialCode;
    return dialB.length - dialA.length;
  });

  for (const country of sortedCountries) {
    const parsed = parseCountry(country);
    if (phoneWithoutPlus === parsed.dialCode) return true;
  }

  return false;
};

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, required, value, onChange, id, name, placeholder, disabled }, ref) => {
    const detectedCountry = useMemo(() => guessUserCountry(), []);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const localInputRef = useRef<HTMLInputElement | null>(null);

    const { inputValue, country, setCountry, handlePhoneValueChange } = usePhoneInput({
      defaultCountry: detectedCountry,
      value: value,
      inputRef: localInputRef,
      disableDialCodePrefill: true,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

    const getDynamicPlaceholder = () => {
      if (!country) return "Ej. +598 96 144 671";

      const placeholders: Record<string, string> = {
        uy: "+598 96 144 671",
        ar: "+54 9 11 222 333",
        es: "+34 600 000 000",
        us: "+1 (555) 000-0000",
        cl: "+56 9 1234 5678",
        co: "+57 300 123 4567",
        mx: "+52 55 1234 5678",
      };

      const iso2 = country.iso2.toLowerCase();
      const formatStr = typeof country.format === "string" ? country.format : "";
      const example = placeholders[iso2] || `+${country.dialCode} ${formatStr.replace(/\./g, "9")}`;
      return `Ej. ${example}`;
    };

    // Expose localInputRef through React forwardRef
    React.useImperativeHandle(ref, () => localInputRef.current!);

    // Map, localize in Spanish and filter countries
    const phoneCountries = useMemo(() => {
      try {
        const regionNames = new Intl.DisplayNames(["es"], { type: "region" });
        const mapped = defaultCountries.map((c) => {
          const parsed = parseCountry(c);
          let localizedName = parsed.name;
          try {
            localizedName = regionNames.of(parsed.iso2.toUpperCase()) || parsed.name;
          } catch {
            // Fallback
          }
          return {
            name: localizedName,
            iso2: parsed.iso2,
            dialCode: parsed.dialCode,
          };
        });

        // Unique countries by iso2
        const uniqueMap = new Map<string, (typeof mapped)[0]>();
        mapped.forEach((item) => {
          if (!uniqueMap.has(item.iso2)) {
            uniqueMap.set(item.iso2, item);
          }
        });

        const sorted = Array.from(uniqueMap.values()).sort((a, b) =>
          a.name.localeCompare(b.name, "es", { sensitivity: "base" })
        );

        const topIso2s = ["uy", "ar", "es", "us", "cl", "co", "mx"];
        const topCountries: typeof sorted = [];
        const remainingCountries: typeof sorted = [];

        sorted.forEach((c) => {
          if (topIso2s.includes(c.iso2)) {
            topCountries.push(c);
          } else {
            remainingCountries.push(c);
          }
        });

        topCountries.sort((a, b) => topIso2s.indexOf(a.iso2) - topIso2s.indexOf(b.iso2));

        return {
          top: topCountries,
          remaining: remainingCountries,
          all: [...topCountries, ...remainingCountries],
        };
      } catch {
        // Safe fallback in case of errors
        const fallbackList = defaultCountries.map((c) => {
          const parsed = parseCountry(c);
          return {
            name: parsed.name,
            iso2: parsed.iso2,
            dialCode: parsed.dialCode,
          };
        });
        return {
          top: fallbackList.slice(0, 5),
          remaining: fallbackList.slice(5),
          all: fallbackList,
        };
      }
    }, []);

    // Filter list options dynamically based on search text (matching name or dial code)
    const filteredCountries = useMemo(() => {
      if (!searchQuery.trim()) {
        return [
          ...phoneCountries.top,
          { name: "divider", iso2: "divider", dialCode: "" },
          ...phoneCountries.remaining,
        ];
      }
      const query = normalizeString(searchQuery);
      const cleanQuery = query.startsWith("+") ? query.slice(1) : query;

      return phoneCountries.all.filter((c) => {
        return normalizeString(c.name).includes(query) || c.dialCode.includes(cleanQuery);
      });
    }, [phoneCountries, searchQuery]);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    // Scroll keyboard active item into view
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
          while (next < filteredCountries.length && filteredCountries[next].iso2 === "divider") {
            next++;
          }
          return next < filteredCountries.length ? next : prev;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && filteredCountries[next].iso2 === "divider") {
            next--;
          }
          return next >= 0 ? next : prev;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredCountries.length) {
          const selected = filteredCountries[focusedIndex];
          if (selected && selected.iso2 !== "divider") {
            setCountry(selected.iso2);
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
      <div className="relative w-full space-y-2" ref={containerRef}>
        {label && (
          <label
            htmlFor={id}
            className="text-chrome-highlight animate-fade-in block text-xs font-medium tracking-wider uppercase"
          >
            <span>{label}</span>
            {required ? (
              <sup
                aria-hidden="true"
                className="ml-0.5 font-sans text-[10px] font-normal text-red-400 select-none"
              >
                *
              </sup>
            ) : (
              <span className="text-copy-muted/50 ml-2 text-[10px] font-normal tracking-normal normal-case select-none">
                (opcional)
              </span>
            )}
          </label>
        )}

        <div
          className={cn(
            "bg-carbon-black/50 border-steel-grey/50 focus-within:border-electric-violet focus-within:ring-electric-violet relative flex min-h-[46px] items-stretch overflow-visible rounded-lg border transition-all focus-within:ring-1 md:min-h-[42px]",
            error && "border-red-500/50 focus-within:border-red-500",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {/* Country Selector Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => toggleDropdown(!isOpen)}
            className="border-steel-grey/30 hover:bg-steel-grey/10 text-chrome-highlight flex shrink-0 cursor-pointer items-center gap-1.5 rounded-l-lg border-r bg-transparent pr-3 pl-4 transition-colors select-none disabled:cursor-not-allowed"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={
              country
                ? `Seleccionar prefijo de país (actual: +${country.dialCode})`
                : "Seleccionar prefijo de país"
            }
          >
            {country && (
              <FlagImage
                iso2={country.iso2}
                style={{ width: "20px", height: "15px" }}
                className="shrink-0 rounded-sm"
              />
            )}
            <ChevronDown
              className={cn(
                "text-chrome-deep h-3.5 w-3.5 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {/* Tel Input */}
          <input
            ref={(node) => {
              localInputRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="tel"
            id={id}
            name={name}
            required={required}
            disabled={disabled}
            value={inputValue}
            onChange={handlePhoneValueChange}
            onFocus={() => {
              if (!value || value.trim() === "") {
                onChange("+" + (country?.dialCode || "598"));
              }
            }}
            onBlur={() => {
              const cleanPhone = value.replace(/[\s()\-]/g, "");
              if (isOnlyDialCode(cleanPhone)) {
                onChange("");
              }
            }}
            placeholder={placeholder || getDynamicPlaceholder()}
            className="text-chrome-highlight placeholder:text-chrome-deep/40 w-full rounded-r-lg bg-transparent px-4 py-3 text-base outline-none disabled:cursor-not-allowed md:text-sm"
          />

          {value &&
            value.trim() !== "" &&
            !isOnlyDialCode(value.replace(/[\s()\-]/g, "")) &&
            !disabled && (
              <div className="flex shrink-0 items-center pr-3">
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    if (localInputRef.current) {
                      localInputRef.current.value = "";
                      localInputRef.current.focus();
                    }
                  }}
                  className="hover:bg-steel-grey/30 text-chrome-deep hover:text-chrome-highlight shrink-0 cursor-pointer rounded-full p-0.5 transition-all select-none"
                  aria-label="Limpiar teléfono"
                >
                  <X className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>
            )}
        </div>

        {/* Custom Country Dropdown */}
        {isOpen && (
          <div className="bg-carbon-black border-steel-grey/50 absolute left-0 z-50 mt-0.5 w-[280px] overflow-hidden rounded-lg border shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)]">
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
                placeholder="Buscar país o código..."
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

            {/* Country list */}
            <ul
              ref={listRef}
              role="listbox"
              className="max-h-[180px] overflow-y-auto py-1"
              data-lenis-prevent="true"
            >
              {filteredCountries.length === 0 ? (
                <li className="text-chrome-deep/60 px-4 py-3 text-center text-sm">
                  No se encontraron resultados
                </li>
              ) : (
                filteredCountries.map((c, idx) => {
                  if (c.iso2 === "divider") {
                    return (
                      <li key={`divider-${idx}`} className="bg-steel-grey/30 mx-2 my-1 h-px" />
                    );
                  }

                  const isSelected = country && c.iso2 === country.iso2;
                  const isFocused = idx === focusedIndex;

                  return (
                    <button
                      key={`${c.iso2}-${idx}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setCountry(c.iso2);
                        toggleDropdown(false);
                      }}
                      onMouseEnter={() => setFocusedIndex(idx)}
                      className={cn(
                        "text-chrome-highlight hover:bg-steel-grey/30 flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-base transition-colors select-none hover:text-white md:text-sm",
                        isSelected &&
                          "bg-electric-violet/10 text-electric-violet hover:bg-electric-violet/15 hover:text-electric-violet font-semibold",
                        isFocused && "bg-steel-grey/30 text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <FlagImage
                          iso2={c.iso2}
                          style={{ width: "20px", height: "15px" }}
                          className="shrink-0 rounded-sm"
                        />
                        <span className="max-w-[140px] truncate">{c.name}</span>
                      </div>
                      <span className="text-chrome-deep text-xs font-normal select-none">
                        +{c.dialCode}
                      </span>
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
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
