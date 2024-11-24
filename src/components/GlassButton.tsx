import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GlassButtonProps {
  icon: LucideIcon;
  label: string;
  count?: string;
  onClick: () => void;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ icon: Icon, label, count, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-1 group"
      onClick={onClick}
    >
      <div className="relative p-2.5 rounded-full bg-black/20 backdrop-blur-lg group-hover:bg-white/20 transition-all">
        <Icon className="w-6 h-6 text-white" />
      </div>
      {count && (
        <span className="text-white text-sm font-helvetica-rounded">
          {count}
        </span>
      )}
      <span className="text-white text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </motion.button>
  );
};