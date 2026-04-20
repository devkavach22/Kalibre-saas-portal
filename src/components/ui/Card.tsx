import React, { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`
      bg-white border border-black/[0.04] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]
      ${noPadding ? '' : 'p-8'} ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;
