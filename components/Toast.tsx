import React, { useEffect } from 'react';
import { ToastMessage } from '../types';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-md border ${styles[toast.type]} transition-all animate-in slide-in-from-top-2 fade-in duration-300`}>
      {icons[toast.type]}
      <span className="text-sm font-medium">{toast.message}</span>
      <button 
        onClick={() => onClose(toast.id)}
        className="ml-auto hover:bg-black/5 p-1 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};