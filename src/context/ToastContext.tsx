import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500); // slightly faster hide for professional feel
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              className="pointer-events-auto relative flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/10 min-w-[320px] max-w-[420px] bg-neutral-900/90 backdrop-blur-3xl overflow-hidden"
            >
              {/* Subtle dynamic glow effect on the left border based on type */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  toast.type === "error" ? "bg-brand-red" : 
                  toast.type === "success" ? "bg-emerald-500" :
                  "bg-blue-500"
                }`}
              />
              
              <div className="flex-shrink-0 ml-1">
                {toast.type === 'error' && <AlertCircle size={20} className="text-brand-red" />}
                {toast.type === 'success' && <CheckCircle2 size={20} className="text-emerald-500" />}
                {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
              </div>
              
              <div className="flex-1 pr-2">
                <p className="text-[14px] font-medium leading-snug text-white/90">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-50 hover:opacity-100 hover:bg-white/10 p-1.5 rounded-lg transition-all flex-shrink-0 text-white"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
