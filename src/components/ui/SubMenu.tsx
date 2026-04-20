import React from 'react';
import { motion } from 'framer-motion';

interface SubMenuProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SubMenu: React.FC<SubMenuProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center p-1.5 rounded-2xl bg-white border border-black-[0.03] w-max max-w-full overflow-x-auto scrollbar-hide shadow-[0_2px_15px_rgba(0,0,0,0.02)] mb-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative whitespace-nowrap px-6 py-2.5 rounded-[12px] text-sm font-bold transition-all duration-300 z-10 ${
              isActive ? 'text-brand-red' : 'text-brand-grey hover:text-brand-black'
            }`}
          >
            {tab}
            {isActive && (
              <motion.div
                layoutId="submenu-pill"
                className="absolute inset-0 bg-brand-red/5 rounded-[12px] -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SubMenu;
