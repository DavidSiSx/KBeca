import React from 'react';

interface RadioCardProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  label: string;
}

export function RadioCard({ id, name, value, checked, onChange, icon, label }: RadioCardProps) {
  return (
    <label 
      htmlFor={id} 
      className={`
        flex items-center gap-sm p-md rounded-xl border-2 cursor-pointer transition-all duration-200
        ${checked ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:border-outline'}
      `}
    >
      <input 
        type="radio" 
        id={id} 
        name={name} 
        value={value} 
        checked={checked} 
        onChange={onChange} 
        className="sr-only"
      />
      <span className="material-symbols-outlined text-[24px]" aria-hidden="true">{icon}</span>
      <span className="font-label-lg text-label-lg flex-1">{label}</span>
      {checked && (
        <span className="material-symbols-outlined text-primary ml-auto" aria-hidden="true">check_circle</span>
      )}
    </label>
  );
}
