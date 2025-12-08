import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

interface AppContextType {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  isMobile: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { width } = useWindowSize();
  const isMobile = width < 769;

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
        isMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
