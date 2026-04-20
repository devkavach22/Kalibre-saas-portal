import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, value, onChange, placeholder = "Select...", error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removePill = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedOptions = options.filter(opt => value.includes(opt.value));

  return (
    <div className="w-full flex flex-col gap-2 relative" ref={containerRef}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[2px] text-brand-grey pl-1">
          {label}
        </label>
      )}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-white border border-black/[0.05] rounded-2xl min-h-[48px] py-2 px-4
          flex flex-wrap items-center gap-2 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)]
          focus-within:border-brand-red focus-within:ring-4 focus-within:ring-brand-red/10 transition-all
          ${error ? 'border-red-500' : ''}
        `}
      >
        {selectedOptions.length === 0 && (
           <span className="text-sm text-brand-black/40 py-1.5">{placeholder}</span>
        )}
        
        {selectedOptions.map((opt) => (
          <span 
            key={opt.value} 
            className="flex items-center gap-1.5 bg-black/5 text-brand-black text-xs font-bold px-3 py-1.5 rounded-lg"
          >
            {opt.label}
            <div 
              onClick={(e) => removePill(e, opt.value)}
              className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
            >
              <X size={12} className="text-brand-grey" />
            </div>
          </span>
        ))}
        
        {/* Dropdown chevron floating right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-grey pointer-events-none">
           <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/5 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto p-2">
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() => toggleOption(opt.value)}
                className={`
                  px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors flex justify-between items-center
                  ${isSelected ? 'bg-brand-red/5 text-brand-red' : 'hover:bg-black/5 text-brand-black'}
                `}
              >
                {opt.label}
                {isSelected && <div className="w-2 h-2 rounded-full bg-brand-red" />}
              </div>
            );
          })}
        </div>
      )}
      
      {error && <span className="text-xs text-red-500 font-medium pl-1">{error}</span>}
    </div>
  );
};

export default MultiSelect;
