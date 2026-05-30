"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Check, PackageOpen, Archive, Building2, Trash2, HardHat, MessageCircle, Home, Briefcase, TrendingUp, LayoutGrid, Sofa, Leaf, ClipboardList, Package } from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "Residential Moving",   label: "Residential Moving",   Icon: Home         },
  { value: "Commercial Moving",    label: "Commercial Moving",    Icon: Briefcase    },
  { value: "Packing & Unpacking",  label: "Packing & Unpacking",  Icon: Archive      },
  { value: "Office Moving",        label: "Office Moving",        Icon: Building2    },
  { value: "Junk Removal",         label: "Junk Removal",         Icon: Trash2       },
  { value: "Jobsite Labour",       label: "Jobsite Labour",       Icon: HardHat      },
  { value: "Delivery Service",     label: "Delivery Service",     Icon: Package      },
  { value: "Investor Relations",   label: "Investor Relations",   Icon: TrendingUp   },
  { value: "Other",                label: "Other",                Icon: MessageCircle },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: "House",     label: "House",     Icon: Home      },
  { value: "Apartment", label: "Apartment", Icon: Building2 },
  { value: "Condo",     label: "Condo",     Icon: LayoutGrid },
  { value: "Office",    label: "Office",    Icon: Briefcase },
];

const JUNK_TYPE_OPTIONS = [
  { value: "Junk Removal",        label: "Junk Removal",        Icon: Trash2       },
  { value: "Furniture Removal",   label: "Furniture Removal",   Icon: Sofa         },
  { value: "Appliance Removal",   label: "Appliance Removal",   Icon: PackageOpen  },
  { value: "Construction Waste",  label: "Construction Waste",  Icon: HardHat      },
  { value: "Yard Waste",          label: "Yard Waste",          Icon: Leaf         },
  { value: "Garage Cleanup",      label: "Garage Cleanup",      Icon: Archive      },
  { value: "Office Cleanup",      label: "Office Cleanup",      Icon: ClipboardList },
  { value: "Other",               label: "Other",               Icon: MessageCircle },
];

export { SERVICE_OPTIONS, PROPERTY_TYPE_OPTIONS, JUNK_TYPE_OPTIONS };

export default function ServiceSelect({ value, onChange, name = "service", options = SERVICE_OPTIONS, placeholder = "Select a service...", required, error }) {
  const [open,    setOpen]    = useState(false);
  const [focused, setFocused] = useState(-1);
  const containerRef          = useRef(null);
  const listRef               = useRef(null);

  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const onKeyDown = useCallback((e) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setFocused(selected ? options.indexOf(selected) : 0);
      }
      return;
    }
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focused >= 0) pick(options[focused].value);
    }
  }, [open, focused, selected, options]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open || focused < 0) return;
    const el = listRef.current?.children[focused];
    el?.scrollIntoView({ block: "nearest" });
  }, [focused, open]);

  function pick(val) {
    onChange({ target: { name, value: val } });
    setOpen(false);
    setFocused(-1);
  }

  return (
    <div ref={containerRef} className="relative">
      <input type="text" name={name} value={value} required={required} readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />

      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={placeholder}
        onKeyDown={onKeyDown}
        onClick={() => { setOpen((o) => !o); setFocused(selected ? options.indexOf(selected) : 0); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-bg font-body text-sm
                    transition-all duration-200 text-left outline-none
                    ${error
                      ? "border-red-400 ring-2 ring-red-100"
                      : open
                        ? "border-secondary ring-2 ring-secondary/10"
                        : "border-surface-2 hover:border-[#0D1D46]/25 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    }`}
      >
        {selected ? (
          <>
            <selected.Icon size={15} className="shrink-0 text-secondary" />
            <span className="flex-1 text-[#0D1D46] font-500">{selected.label}</span>
          </>
        ) : (
          <span className="flex-1 text-[#0D1D46]/30">{placeholder}</span>
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 text-[#0D1D46]/40"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            role="listbox"
            aria-label={placeholder}
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute z-50 top-[calc(100%+6px)] left-0 right-0
                       bg-white border border-surface-2 rounded-xl
                       shadow-[0_8px_32px_rgba(13,29,70,0.12)]
                       overflow-hidden py-1.5"
          >
            {options.map((opt, i) => {
              const isSelected = value === opt.value;
              const isFocused  = focused === i;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setFocused(i)}
                  onMouseLeave={() => setFocused(-1)}
                  onClick={() => pick(opt.value)}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer select-none transition-colors duration-100
                              ${isFocused ? "bg-bg" : ""}
                              ${isSelected ? "bg-secondary/5" : ""}`}
                >
                  <opt.Icon size={15} className={`shrink-0 ${isSelected ? "text-secondary" : "text-[#0D1D46]/40"}`} />
                  <span className={`flex-1 font-body text-sm font-500
                                   ${isSelected ? "text-secondary" : "text-[#0D1D46]"}`}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Check size={14} className="text-secondary" />
                    </motion.span>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
