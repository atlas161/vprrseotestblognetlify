import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[200] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-surface border border-accent/20 shadow-2xl shadow-accent/10 text-white px-4 py-3 rounded-xl flex items-center gap-3 pr-10 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
        <div className="bg-accent/10 p-1.5 rounded-full text-accent">
          <Check size={16} strokeWidth={3} />
        </div>
        <div>
          <p className="text-sm font-medium text-white/90">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
