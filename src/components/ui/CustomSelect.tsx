"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

export interface CustomSelectOption {
  value: string;
  label: string;
  desc?: string;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  id,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={containerRef} id={id}>
      {/* Trigger Button */}
      { }
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (
            (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") &&
            !isOpen
          ) {
            e.preventDefault();
            setIsOpen(true);
            setTimeout(() => {
              const firstOption = containerRef.current?.querySelector(
                'li[role="option"]',
              ) as HTMLLIElement;
              if (firstOption) firstOption.focus();
            }, 50);
          } else if (e.key === "Escape" && isOpen) {
            setIsOpen(false);
          }
        }}
        {...{ "aria-haspopup": "listbox", "aria-expanded": isOpen }}
        className={clsx(
          "w-full h-[56px] px-4 py-2 border-[3px] border-on-background flex items-center justify-between transition-all outline-none",
          "focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "bg-background font-display-md font-bold text-lg uppercase tracking-wider",
          isOpen
            ? "shadow-none translate-x-[2px] translate-y-[2px]"
            : "shadow-[6px_6px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18]",
          selectedOption ? "text-on-background" : "text-on-background/70",
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "w-6 h-6 text-on-background stroke-[3] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          role="listbox"
          aria-label={placeholder || "Opciones disponibles"}
          tabIndex={-1}
          className="absolute z-50 w-full mt-2 bg-surface-container-lowest border-[3px] border-on-background shadow-[8px_8px_0px_0px_#1c1c18] max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                {...{ "aria-selected": isSelected }}
                tabIndex={0}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  containerRef.current?.querySelector("button")?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(option.value);
                    setIsOpen(false);
                    containerRef.current?.querySelector("button")?.focus();
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const nextItem = e.currentTarget
                      .nextElementSibling as HTMLLIElement;
                    if (nextItem) nextItem.focus();
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const prevItem = e.currentTarget
                      .previousElementSibling as HTMLLIElement;
                    if (prevItem) prevItem.focus();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setIsOpen(false);
                    containerRef.current?.querySelector("button")?.focus();
                  }
                }}
                className={clsx(
                  "px-4 py-3 cursor-pointer transition-colors flex items-center justify-between border-b-[3px] border-on-background last:border-b-0 outline-none",
                  "focus-visible:bg-surface-variant focus-visible:ring-inset focus-visible:ring-4 focus-visible:ring-primary",
                  isSelected
                    ? "bg-primary text-on-primary font-[900]"
                    : "text-on-background hover:bg-surface-variant font-bold",
                )}
              >
                <div className="flex flex-col font-display-md tracking-wider">
                  <span>{option.label}</span>
                  {option.desc && (
                    <span className={clsx("text-sm font-bold", isSelected ? "text-on-primary/80" : "text-on-surface-variant")}>
                      {option.desc}
                    </span>
                  )}
                </div>
                {isSelected && <Check className="w-6 h-6 text-on-primary stroke-[3]" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
