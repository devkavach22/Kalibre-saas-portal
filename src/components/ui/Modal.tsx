import React, { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, width = "max-w-md" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-[100]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 pointer-events-none z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full ${width} bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] pointer-events-auto border border-black/[0.04] overflow-hidden flex flex-col max-h-[90vh]`}
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-black/[0.03] flex items-center justify-between bg-white relative z-10 shrink-0">
                <h2 className="text-xl font-black tracking-tight text-brand-black">{title}</h2>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-brand-grey hover:bg-brand-red/10 hover:text-brand-red transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Content / Form area */}
              <div className="p-8 overflow-y-auto scrollbar-hide flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
