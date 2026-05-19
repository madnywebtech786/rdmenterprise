"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Check, Truck, PackageOpen, Archive, Building2, Trash2, HardHat, MessageCircle } from "lucide-react";

const OPTIONS = [
  { value: "Delivery",              label: "Delivery",             Icon: Truck          },
  { value: "Moving Services",       label: "Moving Services",      Icon: PackageOpen    },
  { value: "Packing and Unpacking", label: "Packing & Unpacking",  Icon: Archive        },
  { value: "Office Move",           label: "Office Move",          Icon: Building2      },
  { value: "Junk Removal",          label: "Junk Removal",         Icon: Trash2         },
  { value: "Hourly Labour",         label: "Hourly Labour",        Icon: HardHat        },
  { value: "Other",                 label: "Other",                Icon: MessageCircle  },
];

export default function ServiceSelect({ value, onChange, required }) {
  const [open,    setOpen]    = useState(false);
  const [focused, setFocused] = useState(-1);
  const containerRef          = useRef(null);
  const listRef               = useRef(null);

  const selected = OPTIONS.find((o) => o.value === value) ?? null;

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  /* close on Escape, navigate with arrows */
  const onKeyDown = useCallback((e) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setFocused(selected ? OPTIONS.indexOf(selected) : 0);
      }
      return;
    }
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, OPTIONS.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focused >= 0) pick(OPTIONS[focused].value);
    }
  }, [open, focused, selected]); // eslint-disable-line react-hooks/exhaustive-deps

  /* scroll focused option into view */
  useEffect(() => {
    if (!open || focused < 0) return;
    const el = listRef.current?.children[focused];
    el?.scrollIntoView({ block: "nearest" });
  }, [focused, open]);

  function pick(val) {
    onChange({ target: { name: "service", value: val } });
    setOpen(false);
    setFocused(-1);
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input for form validation */}
      <input type="text" name="service" value={value} required={required} readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />

      {/* Trigger */}
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select a service"
        onKeyDown={onKeyDown}
        onClick={() => { setOpen((o) => !o); setFocused(selected ? OPTIONS.indexOf(selected) : 0); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-[#f8f7f4] font-body text-sm
                    transition-all duration-200 text-left outline-none
                    ${open
                      ? "border-secondary ring-2 ring-secondary/10"
                      : "border-[#e8e4dd] hover:border-[#0D1D46]/25 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    }`}
      >
        {selected ? (
          <>
            <selected.Icon size={15} className="shrink-0 text-secondary" />
            <span className="flex-1 text-[#0D1D46] font-500">{selected.label}</span>
          </>
        ) : (
          <span className="flex-1 text-[#0D1D46]/30">Select a service...</span>
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 text-[#0D1D46]/40"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            role="listbox"
            aria-label="Services"
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute z-50 top-[calc(100%+6px)] left-0 right-0
                       bg-white border border-[#e8e4dd] rounded-xl
                       shadow-[0_8px_32px_rgba(13,29,70,0.12)]
                       overflow-hidden py-1.5"
          >
            {OPTIONS.map((opt, i) => {
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
                              ${isFocused ? "bg-[#f8f7f4]" : ""}
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
