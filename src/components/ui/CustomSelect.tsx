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
        aria-haspopup="listbox"
        aria-expanded={isOpen ? "true" : "false"}
        className={clsx(
          "w-full h-[56px] px-4 py-2 border-2 rounded-lg flex items-center justify-between transition-colors outline-none",
          "bg-surface-container-lowest font-body-lg text-body-lg",
          isOpen
            ? "border-secondary ring-1 ring-secondary"
            : "border-outline-variant hover:border-outline",
          selectedOption ? "text-on-surface" : "text-on-surface-variant",
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-on-surface-variant transition-transform duration-200",
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
          className="absolute z-50 w-full mt-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected ? "true" : "false"}
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
                  "px-4 py-3 cursor-pointer transition-colors flex items-center justify-between",
                  isSelected
                    ? "bg-secondary-container/30 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container",
                )}
              >
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {option.desc && (
                    <span className="text-sm font-normal text-on-surface-variant">
                      {option.desc}
                    </span>
                  )}
                </div>
                {isSelected && <Check className="w-5 h-5 text-primary" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
