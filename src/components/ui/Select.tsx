import React, { type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  options: { label: string; value: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, icon, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-[10px] font-black uppercase tracking-[2px] text-brand-grey pl-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey pointer-events-none">
              {icon}
            </div>
          )}
          <select
            ref={ref}
            className={cn(
              "appearance-none w-full bg-white border border-black/[0.05] rounded-2xl py-3.5",
              icon ? "pl-11" : "pl-5",
              "pr-10 text-sm text-brand-black",
              "focus:bg-white focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/10",
              "transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
              className
            )}
            {...props}
          >
            <option value="" disabled selected className="text-black/20">Select an option...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-grey pointer-events-none">
            <ChevronDown size={18} />
          </div>
        </div>
        <AnimatePresence>
            {error && (
            <motion.span 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-500 font-medium pl-1"
            >
                {error}
            </motion.span>
            )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
