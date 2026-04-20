import React, { type InputHTMLAttributes } from 'react';
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-[10px] font-black uppercase tracking-[2px] text-brand-grey pl-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-white border border-black/[0.05] rounded-2xl py-3.5",
              icon ? "pl-11" : "pl-5",
              "pr-5 text-sm text-brand-black placeholder:text-black/20",
              "focus:bg-white focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/10",
              "transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 font-medium pl-1"
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

import { motion } from 'framer-motion';
