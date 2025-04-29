import React, { createContext, useContext } from 'react';
import { toastConfig } from '@/constants/toastConfig';
import Toast from 'react-native-toast-message';

interface ToastContextType {
  showToast: (type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultTitles: Record<'success' | 'error' | 'info' | 'warning', string> = {
    success: "Success",
    error: "Error",
    info: "Information",
    warning: "Warning",
  };

  const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string) => {
    const toastTitle = title || defaultTitles[type];

    Toast.show({
      type: type === 'warning' ? 'info' : type,
      text1: toastTitle,
      text2: message,
      position: 'top',
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast config={toastConfig} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
